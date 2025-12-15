import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface MonthlyProgress {
    id?: number;
    year: number;
    month: number;
    progress: number | string;
    monthly_contribution?: number;
}

interface ActionPlan {
    id?: number;
    activity_number: string | number;
    activity_name: string;
    project_manager_status: string;
    start_date?: string;
    end_date?: string;
    display_order?: number;
    initiative_id?: number;
    monthly_progress?: MonthlyProgress[]; // From backend
    monthly_progress_inputs?: Record<string, number>; // For form state: 'YYYY-MM' -> progress
    duration_months?: number; // Computed from backend
    weight_percentage?: number; // Computed from backend
    cumulative_progress?: number; // Computed from backend
    yearly_impact?: number; // Computed from backend
}

interface KpiData {
    metric_name: string;
    uom: string;
    target: string;
    current_value?: number;
    achievement_percentage?: number;
}

interface ActionPlanModalProps {
    show: boolean;
    mode: 'view' | 'edit' | 'create' | 'delete';
    actionPlan?: ActionPlan | null;
    initiativeKpis?: KpiData[];
    onClose: () => void;
    onSave: (data: ActionPlan) => void;
    onDelete?: (id: number) => void;
}

// Fungsi untuk memformat tanggal menjadi format 'Jan-Mar 2026' atau 'Jan 2026'
const formatDueDate = (startDate?: string, endDate?: string): string => {
    if (!endDate) return '-';

    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    try {
        const end = new Date(endDate);
        const endMonth = monthNames[end.getMonth()];
        const endYear = end.getFullYear();

        // Jika ada start_date, format sebagai rentang
        if (startDate) {
            const start = new Date(startDate);
            const startMonth = monthNames[start.getMonth()];
            const startYear = start.getFullYear();

            // Jika tahun sama, tampilkan 'Jan-Mar 2026'
            if (startYear === endYear) {
                // Jika bulan sama, tampilkan 'Jan 2026'
                if (startMonth === endMonth) {
                    return `${startMonth} ${startYear}`;
                }
                return `${startMonth}-${endMonth} ${endYear}`;
            } else {
                // Jika tahun berbeda, tampilkan 'Jan 2025-Mar 2026'
                return `${startMonth} ${startYear}-${endMonth} ${endYear}`;
            }
        } else {
            // Jika hanya ada end_date, tampilkan 'Mar 2026'
            return `${endMonth} ${endYear}`;
        }
    } catch (error) {
        console.error('Error formatting date:', error);
        return endDate;
    }
};

export default function ActionPlanModal({
    show,
    mode,
    actionPlan,
    initiativeKpis = [],
    onClose,
    onSave,
    onDelete,
}: ActionPlanModalProps) {
    const [formData, setFormData] = useState<ActionPlan>({
        activity_number: 1,
        activity_name: '',
        project_manager_status: 'blue',
        start_date: '',
        end_date: '',
        display_order: 1,
        initiative_id: 0,
        monthly_progress_inputs: {},
    });

    // Helper to generate list of months between start and end date
    const getMonthsBetween = (start?: string, end?: string): string[] => {
        if (!start || !end) return [];
        try {
            const months: string[] = [];
            const startDate = new Date(start + '-01');
            const endDate = new Date(end + '-01');

            // Validate dates
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()))
                return [];
            if (startDate > endDate) return [];

            const current = new Date(startDate);
            while (current <= endDate) {
                const year = current.getFullYear();
                const month = String(current.getMonth() + 1).padStart(2, '0');
                months.push(`${year}-${month}`);
                current.setMonth(current.getMonth() + 1);
            }
            return months;
        } catch (e) {
            return [];
        }
    };

    // Calculate derived metrics for display
    const calculateMetrics = (data: ActionPlan) => {
        const months = getMonthsBetween(data.start_date, data.end_date);
        const duration = Math.max(1, months.length);
        const weight = Math.min(100, (duration / 12) * 100);

        let totalProgress = 0;
        let count = 0;

        if (data.monthly_progress_inputs) {
            months.forEach((month) => {
                const progress = Number(
                    data.monthly_progress_inputs?.[month] || 0,
                );
                totalProgress += progress;
                count++;
            });
        }

        const avgProgress = count > 0 ? totalProgress / count : 0;
        // Rumus baru: Yearly Impact = Avg Progress * (Duration / 12)
        // = Avg Progress * (Weight / 100)
        const yearlyImpact = (avgProgress * weight) / 100;

        return { duration, weight, avgProgress, yearlyImpact };
    };

    const [metrics, setMetrics] = useState({
        duration: 0,
        weight: 0,
        avgProgress: 0,
        yearlyImpact: 0,
    });

    useEffect(() => {
        setMetrics(calculateMetrics(formData));
    }, [
        formData.start_date,
        formData.end_date,
        formData.monthly_progress_inputs,
    ]);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fungsi untuk mengkonversi format tanggal dari database (ISO 8601) ke format YYYY-MM untuk HTML month input
    const formatMonthForInput = (dateString?: string): string => {
        if (!dateString) return '';
        try {
            // Mengambil tahun dan bulan saja dari format ISO 8601 (2026-01-01T00:00:00.000000Z)
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            return `${year}-${month}`; // Format: 2026-01
        } catch {
            return '';
        }
    };

    // Fungsi untuk mengkonversi format YYYY-MM ke YYYY-MM-01 (tanggal awal bulan) saat menyimpan ke database
    const convertMonthToStartDate = (monthString?: string): string => {
        if (!monthString) return '';
        // Format input: 2026-01, format output: 2026-01-01
        return `${monthString}-01`;
    };

    // Fungsi untuk mengkonversi format YYYY-MM ke tanggal akhir bulan saat menyimpan ke database
    const convertMonthToEndDate = (monthString?: string): string => {
        if (!monthString) return '';
        try {
            // Parse tahun dan bulan dari format YYYY-MM
            const [year, month] = monthString.split('-').map(Number);
            // Dapatkan tanggal terakhir bulan tersebut dengan membuat Date untuk bulan berikutnya lalu kurangi 1 hari
            const lastDay = new Date(year, month, 0).getDate();
            return `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
        } catch {
            return `${monthString}-01`;
        }
    };

    // Initialize form data when actionPlan changes or mode changes
    useEffect(() => {
        if (actionPlan && (mode === 'edit' || mode === 'view')) {
            // Transform monthly_progress array to inputs map
            const inputs: Record<string, number> = {};
            if (actionPlan.monthly_progress) {
                actionPlan.monthly_progress.forEach((mp) => {
                    const key = `${mp.year}-${String(mp.month).padStart(2, '0')}`;
                    inputs[key] = Number(mp.progress);
                });
            }

            setFormData({
                id: actionPlan.id,
                activity_number:
                    typeof actionPlan.activity_number === 'string'
                        ? parseInt(actionPlan.activity_number) || 1
                        : actionPlan.activity_number || 1,
                activity_name: actionPlan.activity_name || '',
                project_manager_status:
                    actionPlan.project_manager_status || 'blue',
                start_date: formatMonthForInput(actionPlan.start_date),
                end_date: formatMonthForInput(actionPlan.end_date),
                display_order:
                    typeof actionPlan.display_order === 'string'
                        ? parseInt(actionPlan.display_order) || 1
                        : actionPlan.display_order || 1,
                initiative_id: actionPlan.initiative_id,
                monthly_progress_inputs: inputs,
                // Keep computed values for display reference
                cumulative_progress:
                    Number(actionPlan.cumulative_progress) || 0,
                yearly_impact: Number(actionPlan.yearly_impact) || 0,
            });
        } else if (mode === 'create') {
            setFormData({
                activity_number: 1,
                activity_name: '',
                project_manager_status: 'blue',
                start_date: '',
                end_date: '',
                display_order: 1,
                initiative_id: 0,
                monthly_progress_inputs: {},
            });
        }
        setErrors({});
    }, [actionPlan, mode]);

    const handleChange = (field: string, value: any) => {
        if (['activity_number', 'display_order'].includes(field)) {
            const numValue =
                typeof value === 'string' ? parseInt(value) : value;
            const validValue = isNaN(numValue) ? 1 : numValue;
            setFormData((prev) => ({ ...prev, [field]: validValue }));
        } else {
            setFormData((prev) => ({ ...prev, [field]: value }));
        }

        // Clear error for this field if it exists
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleMonthlyProgressChange = (month: string, value: string) => {
        const numValue = parseFloat(value);
        const validValue = isNaN(numValue)
            ? 0
            : Math.min(100, Math.max(0, numValue));

        setFormData((prev) => ({
            ...prev,
            monthly_progress_inputs: {
                ...prev.monthly_progress_inputs,
                [month]: validValue,
            },
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.activity_name?.trim()) {
            newErrors.activity_name = 'Activity name is required';
        }

        if (!formData.project_manager_status) {
            newErrors.project_manager_status = 'PM status is required';
        }

        if (!formData.start_date) {
            newErrors.start_date = 'Start date is required';
        }

        if (!formData.end_date) {
            newErrors.end_date = 'End date is required';
        }

        if (
            formData.start_date &&
            formData.end_date &&
            formData.start_date > formData.end_date
        ) {
            newErrors.end_date = 'End date must be after start date';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Menyiapkan data untuk dikirim ke API dengan konversi format tanggal
            // User memilih format bulan (YYYY-MM), sistem menyimpan format tanggal lengkap (YYYY-MM-DD)
            // Menyiapkan data untuk dikirim ke API dengan konversi format tanggal
            // User memilih format bulan (YYYY-MM), sistem menyimpan format tanggal lengkap (YYYY-MM-DD)
            // Ensure all months in the range are included with default 0 if missing
            const monthsInRange = getMonthsBetween(
                formData.start_date,
                formData.end_date,
            );
            const completeMonthlyProgress = {
                ...(formData.monthly_progress_inputs || {}),
            };

            monthsInRange.forEach((month) => {
                if (completeMonthlyProgress[month] === undefined) {
                    completeMonthlyProgress[month] = 0;
                }
            });

            const dataToSave = {
                ...formData,
                start_date: convertMonthToStartDate(formData.start_date), // 2026-01 -> 2026-01-01
                end_date: convertMonthToEndDate(formData.end_date), // 2026-03 -> 2026-03-31
                monthly_progress: completeMonthlyProgress, // Send complete inputs map
            } as any;

            await onSave(dataToSave);
            onClose();
        } catch (error) {
            console.error('Error saving action plan:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (actionPlan?.id && onDelete) {
            // Validate ID before proceeding
            if (
                !actionPlan.id ||
                actionPlan.id === undefined ||
                actionPlan.id === null
            ) {
                console.error('Invalid action plan ID:', actionPlan.id);
                return;
            }

            setIsSubmitting(true);
            try {
                await onDelete(actionPlan.id);
                onClose();
            } catch (error) {
                console.error('Error deleting action plan:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const getPMStatusColor = (status: string) => {
        switch (status) {
            case 'green':
                return 'bg-green-500';
            case 'yellow':
                return 'bg-yellow-400';
            case 'red':
                return 'bg-red-500';
            default:
                return 'bg-blue-500';
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl">
                <div className="sticky top-0 flex items-center justify-between border-b bg-white p-4">
                    <h2 className="text-xl font-semibold">
                        {mode === 'view' && 'View Action Plan'}
                        {mode === 'edit' && 'Edit Action Plan'}
                        {mode === 'create' && 'Create New Action Plan'}
                        {mode === 'delete' && 'Delete Action Plan'}
                    </h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="p-4">
                    {mode === 'delete' ? (
                        <div className="space-y-4">
                            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                <h3 className="mb-2 text-lg font-semibold text-red-800">
                                    Confirm Deletion
                                </h3>
                                <p className="mb-4 text-red-700">
                                    Are you sure you want to delete this action
                                    plan? This action cannot be undone.
                                </p>
                                <div className="rounded border bg-white p-3">
                                    <p className="font-medium">
                                        {actionPlan?.activity_name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Activity #{actionPlan?.activity_number}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Deleting...' : 'Delete'}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Form Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        {mode === 'view' ? (
                                            <>
                                                <span>Action Plan Details</span>
                                                <Badge
                                                    variant="outline"
                                                    className="ml-2"
                                                >
                                                    {formData.project_manager_status && (
                                                        <div
                                                            className={`mr-1 h-2 w-2 rounded-full ${getPMStatusColor(formData.project_manager_status)}`}
                                                        ></div>
                                                    )}
                                                    {
                                                        formData.project_manager_status
                                                    }
                                                </Badge>
                                            </>
                                        ) : (
                                            <>
                                                <Edit className="h-4 w-4" />
                                                <span>
                                                    Action Plan Information
                                                </span>
                                            </>
                                        )}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form
                                        key={`form-${formData.id || 'new'}`}
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <div className="mb-4 border-b pb-4">
                                            <h3 className="mb-4 text-lg font-medium">
                                                Basic Information
                                            </h3>

                                            {/* Activity Number dan Display Order di-generate otomatis oleh sistem */}

                                            <div>
                                                <Label htmlFor="activity_name">
                                                    Activity Name
                                                </Label>
                                                <Textarea
                                                    id="activity_name"
                                                    value={
                                                        formData.activity_name
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(
                                                            'activity_name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    disabled={mode === 'view'}
                                                    className={
                                                        errors.activity_name
                                                            ? 'border-red-500'
                                                            : ''
                                                    }
                                                    rows={3}
                                                    placeholder="Masukkan nama kegiatan..."
                                                />
                                                {errors.activity_name && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {errors.activity_name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-4 border-b pb-4">
                                            <h3 className="mb-4 text-lg font-medium">
                                                Status & Schedule
                                            </h3>

                                            <div className="mb-4">
                                                <Label htmlFor="project_manager_status">
                                                    PM Status
                                                </Label>
                                                <Select
                                                    value={
                                                        formData.project_manager_status
                                                    }
                                                    onValueChange={(value) =>
                                                        handleChange(
                                                            'project_manager_status',
                                                            value,
                                                        )
                                                    }
                                                    disabled={mode === 'view'}
                                                >
                                                    <SelectTrigger
                                                        className={
                                                            errors.project_manager_status
                                                                ? 'border-red-500'
                                                                : ''
                                                        }
                                                    >
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="green">
                                                            Green
                                                        </SelectItem>
                                                        <SelectItem value="yellow">
                                                            Yellow
                                                        </SelectItem>
                                                        <SelectItem value="red">
                                                            Red
                                                        </SelectItem>
                                                        <SelectItem value="blue">
                                                            Blue
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.project_manager_status && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {
                                                            errors.project_manager_status
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="start_date">
                                                        Start Month
                                                    </Label>
                                                    <Input
                                                        id="start_date"
                                                        type="month"
                                                        value={
                                                            formData.start_date
                                                        }
                                                        onChange={(e) =>
                                                            handleChange(
                                                                'start_date',
                                                                e.target.value,
                                                            )
                                                        }
                                                        disabled={
                                                            mode === 'view'
                                                        }
                                                        className={
                                                            errors.start_date
                                                                ? 'border-red-500'
                                                                : ''
                                                        }
                                                    />
                                                    {errors.start_date && (
                                                        <p className="mt-1 text-sm text-red-500">
                                                            {errors.start_date}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <Label htmlFor="end_date">
                                                        End Month
                                                    </Label>
                                                    <Input
                                                        id="end_date"
                                                        type="month"
                                                        value={
                                                            formData.end_date
                                                        }
                                                        onChange={(e) =>
                                                            handleChange(
                                                                'end_date',
                                                                e.target.value,
                                                            )
                                                        }
                                                        disabled={
                                                            mode === 'view'
                                                        }
                                                        className={
                                                            errors.end_date
                                                                ? 'border-red-500'
                                                                : ''
                                                        }
                                                    />
                                                    {errors.end_date && (
                                                        <p className="mt-1 text-sm text-red-500">
                                                            {errors.end_date}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 border-t pt-4">
                                            <div className="mb-4 flex items-center justify-between">
                                                <h3 className="text-lg font-medium">
                                                    Monthly Progress
                                                </h3>
                                                <div className="text-sm text-gray-500">
                                                    Duration: {metrics.duration}{' '}
                                                    months | Weight:{' '}
                                                    {metrics.weight.toFixed(2)}%
                                                </div>
                                            </div>

                                            {!formData.start_date ||
                                            !formData.end_date ? (
                                                <div className="rounded-md bg-gray-50 py-4 text-center text-gray-500">
                                                    Please select Start Month
                                                    and End Month to input
                                                    progress.
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="grid max-h-60 grid-cols-2 gap-4 overflow-y-auto p-2 md:grid-cols-3">
                                                        {getMonthsBetween(
                                                            formData.start_date,
                                                            formData.end_date,
                                                        ).map((month) => (
                                                            <div
                                                                key={month}
                                                                className="space-y-1"
                                                            >
                                                                <Label
                                                                    htmlFor={`progress-${month}`}
                                                                    className="text-xs"
                                                                >
                                                                    {month}
                                                                </Label>
                                                                <div className="flex items-center gap-2">
                                                                    <Input
                                                                        id={`progress-${month}`}
                                                                        type="number"
                                                                        min="0"
                                                                        max="100"
                                                                        value={
                                                                            formData
                                                                                .monthly_progress_inputs?.[
                                                                                month
                                                                            ] ??
                                                                            ''
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            handleMonthlyProgressChange(
                                                                                month,
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            mode ===
                                                                            'view'
                                                                        }
                                                                        className="h-8"
                                                                        placeholder="0"
                                                                    />
                                                                    <span className="text-xs text-gray-500">
                                                                        %
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-blue-50 p-4">
                                                <div>
                                                    <Label className="text-blue-800">
                                                        Average Progress
                                                    </Label>
                                                    <div className="text-2xl font-bold text-blue-900">
                                                        {metrics.avgProgress.toFixed(
                                                            2,
                                                        )}
                                                        %
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label className="text-blue-800">
                                                        Yearly Impact
                                                    </Label>
                                                    <div className="text-2xl font-bold text-blue-900">
                                                        {metrics.yearlyImpact.toFixed(
                                                            2,
                                                        )}
                                                        %
                                                    </div>
                                                    <p className="text-xs text-blue-600">
                                                        (Avg Progress × Weight)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {mode !== 'view' && (
                                            <div className="flex justify-end gap-2 pt-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={onClose}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting
                                                        ? 'Saving...'
                                                        : 'Save'}
                                                </Button>
                                            </div>
                                        )}
                                    </form>
                                </CardContent>
                            </Card>

                            {mode === 'view' && (
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button variant="outline" onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            /* Implement edit mode change */
                                        }}
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            /* Implement delete mode change */
                                        }}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
