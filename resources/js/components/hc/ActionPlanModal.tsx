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
import {
    calculateMetrics,
    formatMonthForInput,
    formatMonthToStartDate,
    formatMonthToEndDate,
    transformMonthlyProgressToInputs,
    getMonthsBetween,
    CalculationParams,
    CalculationResult,
    MonthlyProgress,
} from '@/utils/calculations';



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



export default function ActionPlanModal({
    show,
    mode,
    actionPlan,
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



    const [metrics, setMetrics] = useState<CalculationResult>({
        duration: 0,
        weight: 0,
        avgProgress: 0,
        yearlyImpact: 0,
    });

    useEffect(() => {
        // Only calculate metrics for create mode to show real-time preview
        if (mode === 'create') {
            const params: CalculationParams = {
                start_date: formData.start_date,
                end_date: formData.end_date,
                monthly_progress_inputs: formData.monthly_progress_inputs,
            };
            setMetrics(calculateMetrics(params));
        }
    }, [
        mode,
        formData.start_date,
        formData.end_date,
        formData.monthly_progress_inputs,
    ]);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);



    // Initialize form data when actionPlan changes or mode changes
    useEffect(() => {
        if (actionPlan && (mode === 'edit' || mode === 'view')) {
            // Transform monthly_progress array to inputs map
            const inputs = transformMonthlyProgressToInputs(actionPlan.monthly_progress);

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
                // Use backend computed values to ensure consistency
                duration_months: Number(actionPlan.duration_months) || 0,
                weight_percentage: Number(actionPlan.weight_percentage) || 0,
                cumulative_progress: Number(actionPlan.cumulative_progress) || 0,
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
                duration_months: 0,
                weight_percentage: 0,
                cumulative_progress: 0,
                yearly_impact: 0,
            });
        }
        setErrors({});
    }, [actionPlan, mode]);

    const handleChange = (field: string, value: string | number | boolean) => {
        if (['activity_number', 'display_order'].includes(field)) {
            const numValue =
                typeof value === 'string' ? parseInt(value) : value as number;
            const validValue = isNaN(numValue) || typeof numValue !== 'number' ? 1 : numValue;
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
                start_date: formatMonthToStartDate(formData.start_date), // 2026-01 -> 2026-01-01
                end_date: formatMonthToEndDate(formData.end_date), // 2026-03 -> 2026-03-31
                monthly_progress: completeMonthlyProgress, // Send complete inputs map
                // Remove computed fields for create mode - let backend calculate them
                ...(mode === 'create' && {
                    duration_months: undefined,
                    weight_percentage: undefined,
                    cumulative_progress: undefined,
                    yearly_impact: undefined,
                }),
            } as unknown as ActionPlan;

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
                                                    Duration: {mode === 'create' ? metrics.duration : (formData.duration_months || 0)}{' '}
                                                    months | Weight:{' '}
                                                    {mode === 'create' ? metrics.weight.toFixed(2) : (formData.weight_percentage || 0).toFixed(2)}% | Yearly Impact:{' '}
                                                    {mode === 'create' ? metrics.yearlyImpact.toFixed(2) : (formData.yearly_impact || 0).toFixed(2)}%
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
