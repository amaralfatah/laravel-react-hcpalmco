

export interface MonthlyProgress {
    id?: number;
    year: number;
    month: number;
    progress: number | string;
    monthly_contribution?: number;
}

export interface CalculationParams {
    start_date?: string;
    end_date?: string;
    monthly_progress?: MonthlyProgress[];
    monthly_progress_inputs?: Record<string, number>;
}

export interface CalculationResult {
    duration: number;
    weight: number;
    avgProgress: number;
    yearlyImpact: number;
}

/**
 * Generate list of months between start and end date
 * Format: YYYY-MM
 */
export const getMonthsBetween = (start?: string, end?: string): string[] => {
    if (!start || !end) return [];
    try {
        const months: string[] = [];
        const startDate = new Date(start + '-01');
        const endDate = new Date(end + '-01');

        // Validate dates
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return [];
        if (startDate > endDate) return [];

        const current = new Date(startDate);
        while (current <= endDate) {
            const year = current.getFullYear();
            const month = String(current.getMonth() + 1).padStart(2, '0');
            months.push(`${year}-${month}`);
            current.setMonth(current.getMonth() + 1);
        }
        return months;
    } catch {
        return [];
    }
};

/**
 * Calculate duration in months between start and end date
 */
export const calculateDuration = (start?: string, end?: string): number => {
    const months = getMonthsBetween(start, end);
    return Math.max(1, months.length);
};

/**
 * Calculate weight percentage based on duration
 * Weight = (duration / 12) * 100, max 100%
 */
export const calculateWeight = (duration: number): number => {
    return Math.min(100, (duration / 12) * 100);
};

/**
 * Calculate average progress from monthly progress data
 */
export const calculateAverageProgress = (
    monthlyProgressInputs?: Record<string, number>,
    startDate?: string,
    endDate?: string
): number => {
    const months = getMonthsBetween(startDate, endDate);
    let totalProgress = 0;
    let count = 0;

    if (monthlyProgressInputs) {
        months.forEach((month) => {
            const progress = Number(monthlyProgressInputs?.[month] || 0);
            totalProgress += progress;
            count++;
        });
    }

    return count > 0 ? totalProgress / count : 0;
};

/**
 * Calculate yearly impact
 * Backend logic: Sum of monthly contributions where monthly_contribution = progress / 12
 * Frontend equivalent: Sum of all monthly progress values / 12
 */
export const calculateYearlyImpact = (
    avgProgress: number,
    weight: number,
    monthlyProgressInputs?: Record<string, number>
): number => {
    // If we have monthly progress inputs, use backend logic: Sum(progress) / 12
    if (monthlyProgressInputs) {
        const totalProgress = Object.values(monthlyProgressInputs).reduce((sum, progress) => sum + progress, 0);
        return totalProgress / 12;
    }

    // Fallback to original formula for compatibility
    return (avgProgress * weight) / 100;
};

/**
 * Calculate all metrics at once
 */
export const calculateMetrics = (params: CalculationParams): CalculationResult => {
    const { start_date, end_date, monthly_progress_inputs } = params;

    const duration = calculateDuration(start_date, end_date);
    const weight = calculateWeight(duration);
    const avgProgress = calculateAverageProgress(
        monthly_progress_inputs,
        start_date,
        end_date
    );
    const yearlyImpact = calculateYearlyImpact(avgProgress, weight, monthly_progress_inputs);

    return {
        duration,
        weight,
        avgProgress,
        yearlyImpact,
    };
};

/**
 * Transform monthly progress array to inputs map
 */
export const transformMonthlyProgressToInputs = (
    monthlyProgress?: MonthlyProgress[]
): Record<string, number> => {
    const inputs: Record<string, number> = {};
    if (monthlyProgress) {
        monthlyProgress.forEach((mp) => {
            const key = `${mp.year}-${String(mp.month).padStart(2, '0')}`;
            inputs[key] = Number(mp.progress);
        });
    }
    return inputs;
};

/**
 * Format month string (YYYY-MM) to start date (YYYY-MM-01)
 */
export const formatMonthToStartDate = (monthString?: string): string => {
    if (!monthString) return '';
    return `${monthString}-01`;
};

/**
 * Format month string (YYYY-MM) to end date (YYYY-MM-DD)
 */
export const formatMonthToEndDate = (monthString?: string): string => {
    if (!monthString) return '';
    try {
        const [year, month] = monthString.split('-').map(Number);
        const lastDay = new Date(year, month, 0).getDate();
        return `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
    } catch {
        return `${monthString}-01`;
    }
};

/**
 * Format date string to month input format (YYYY-MM)
 */
export const formatMonthForInput = (dateString?: string): string => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    } catch {
        return '';
    }
};
