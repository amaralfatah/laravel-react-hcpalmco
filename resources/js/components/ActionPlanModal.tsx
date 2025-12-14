import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { X, Edit, Trash2, Save } from 'lucide-react';

interface ActionPlan {
    id?: number;
    activity_number: string | number;
    activity_name: string;
    project_manager_status: string;
    due_date: string;
    current_month_progress: string | number;
    cumulative_progress: string | number;
    display_order?: number;
    initiative_id?: number;
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
    initiativeKpis = [],
    onClose, 
    onSave,
    onDelete 
}: ActionPlanModalProps) {
    const [formData, setFormData] = useState<ActionPlan>({
        activity_number: 1,
        activity_name: '',
        project_manager_status: 'blue',
        due_date: '',
        current_month_progress: 0,
        cumulative_progress: 0,
        display_order: 1,
        initiative_id: 0
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    
    // Initialize form data when actionPlan changes or mode changes
    useEffect(() => {
        if (actionPlan && (mode === 'edit' || mode === 'view')) {
            // Ensure numeric fields are properly typed
            setFormData({
                ...actionPlan,
                activity_number: typeof actionPlan.activity_number === 'string' 
                    ? parseInt(actionPlan.activity_number) || 1 
                    : actionPlan.activity_number || 1,
                project_manager_status: actionPlan.project_manager_status || 'blue',
                current_month_progress: typeof actionPlan.current_month_progress === 'string' 
                    ? parseFloat(actionPlan.current_month_progress) || 0 
                    : actionPlan.current_month_progress || 0,
                cumulative_progress: typeof actionPlan.cumulative_progress === 'string' 
                    ? parseFloat(actionPlan.cumulative_progress) || 0 
                    : actionPlan.cumulative_progress || 0,
                display_order: typeof actionPlan.display_order === 'string' 
                    ? parseInt(actionPlan.display_order) || 1 
                    : actionPlan.display_order || 1,
            });
        } else if (mode === 'create') {
            setFormData({
                activity_number: 1,
                activity_name: '',
                project_manager_status: 'blue',
                due_date: '',
                current_month_progress: 0,
                cumulative_progress: 0,
                display_order: 1,
                initiative_id: 0
            });
        }
        setErrors({});
    }, [actionPlan, mode]);
    

    
    const handleChange = (field: string, value: any) => {
        // Handle numeric fields to ensure they're valid numbers
        if (['current_month_progress', 'cumulative_progress'].includes(field)) {
            const numValue = typeof value === 'string' ? parseFloat(value) : value;
            const validValue = isNaN(numValue) ? 0 : numValue;
            setFormData(prev => ({ ...prev, [field]: validValue }));
        } else if (['activity_number', 'display_order'].includes(field)) {
            const numValue = typeof value === 'string' ? parseInt(value) : value;
            const validValue = isNaN(numValue) ? 1 : numValue;
            setFormData(prev => ({ ...prev, [field]: validValue }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
        
        // Clear error for this field if it exists
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };
    
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.activity_name?.trim()) {
            newErrors.activity_name = 'Activity name is required';
        }
        
        // Validate PM status
        if (!formData.project_manager_status) {
            newErrors.project_manager_status = 'PM status is required';
        }
        
        // Get numeric values for validation
        const currentMonth = Number(formData.current_month_progress) || 0;
        const cumulative = Number(formData.cumulative_progress) || 0;
        
        // Validate progress values
        if (currentMonth < 0 || currentMonth > 100) {
            newErrors.current_month_progress = 'Current month progress must be between 0 and 100';
        }
        
        if (cumulative < 0 || cumulative > 100) {
            newErrors.cumulative_progress = 'Cumulative progress must be between 0 and 100';
        }
        
        // Validate cumulative >= current month
        if (cumulative < currentMonth) {
            newErrors.cumulative_progress = 'Cumulative progress must be greater than or equal to current month progress';
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
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error('Error saving action plan:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleDelete = async () => {
        if (actionPlan?.id && onDelete) {
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
            case 'green': return 'bg-green-500';
            case 'yellow': return 'bg-yellow-400';
            case 'red': return 'bg-red-500';
            default: return 'bg-blue-500';
        }
    };
    
    
    
    if (!show) return null;
    
    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                        {mode === 'view' && 'View Action Plan'}
                        {mode === 'edit' && 'Edit Action Plan'}
                        {mode === 'create' && 'Create New Action Plan'}
                        {mode === 'delete' && 'Delete Action Plan'}
                    </h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>
                
                <div className="p-4">
                    {mode === 'delete' ? (
                        <div className="space-y-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-red-800 mb-2">Confirm Deletion</h3>
                                <p className="text-red-700 mb-4">
                                    Are you sure you want to delete this action plan? This action cannot be undone.
                                </p>
                                <div className="bg-white rounded p-3 border">
                                    <p className="font-medium">{actionPlan?.activity_name}</p>
                                    <p className="text-sm text-gray-600">Activity #{actionPlan?.activity_number}</p>
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
                                                <Badge variant="outline" className="ml-2">
                                                    {formData.project_manager_status && (
                                                        <div className={`w-2 h-2 rounded-full mr-1 ${getPMStatusColor(formData.project_manager_status)}`}></div>
                                                    )}
                                                    {formData.project_manager_status}
                                                </Badge>
                                            </>
                                        ) : (
                                            <>
                                                <Edit className="w-4 h-4" />
                                                <span>Action Plan Information</span>
                                            </>
                                        )}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form key={`form-${formData.id || 'new'}`} onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="activity_number">Activity Number</Label>
                                                <Input
                                                    id="activity_number"
                                                    type="number"
                                                    value={formData.activity_number}
                                                    onChange={(e) => handleChange('activity_number', parseInt(e.target.value))}
                                                    disabled={mode === 'view'}
                                                    className={errors.activity_number ? 'border-red-500' : ''}
                                                />
                                                {errors.activity_number && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.activity_number}</p>
                                                )}
                                            </div>
                                            
                                            <div>
                                                <Label htmlFor="display_order">Display Order</Label>
                                                <Input
                                                    id="display_order"
                                                    type="number"
                                                    value={formData.display_order}
                                                    onChange={(e) => handleChange('display_order', parseInt(e.target.value))}
                                                    disabled={mode === 'view'}
                                                    className={errors.display_order ? 'border-red-500' : ''}
                                                />
                                                {errors.display_order && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.display_order}</p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <Label htmlFor="activity_name">Activity Name</Label>
                                            <Textarea
                                                id="activity_name"
                                                value={formData.activity_name}
                                                onChange={(e) => handleChange('activity_name', e.target.value)}
                                                disabled={mode === 'view'}
                                                className={errors.activity_name ? 'border-red-500' : ''}
                                                rows={3}
                                            />
                                            {errors.activity_name && (
                                                <p className="text-red-500 text-sm mt-1">{errors.activity_name}</p>
                                            )}
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="project_manager_status">PM Status</Label>
                                                <Select
                                                    value={formData.project_manager_status}
                                                    onValueChange={(value) => handleChange('project_manager_status', value)}
                                                    disabled={mode === 'view'}
                                                >
                                                    <SelectTrigger className={errors.project_manager_status ? 'border-red-500' : ''}>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="green">Green</SelectItem>
                                                        <SelectItem value="yellow">Yellow</SelectItem>
                                                        <SelectItem value="red">Red</SelectItem>
                                                        <SelectItem value="blue">Blue</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.project_manager_status && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.project_manager_status}</p>
                                                )}
                                            </div>
                                            
                                            <div>
                                                <Label htmlFor="due_date">Due Date</Label>
                                                <Input
                                                    id="due_date"
                                                    value={formData.due_date}
                                                    onChange={(e) => handleChange('due_date', e.target.value)}
                                                    disabled={mode === 'view'}
                                                    className={errors.due_date ? 'border-red-500' : ''}
                                                />
                                                {errors.due_date && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.due_date}</p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="current_month_progress">Current Month Progress (%)</Label>
                                                <div className="space-y-2">
                                                    <Input
                                                        id="current_month_progress"
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        step="0.01"
                                                        value={formData.current_month_progress}
                                                        onChange={(e) => handleChange('current_month_progress', e.target.value)}
                                                        disabled={mode === 'view'}
                                                        className={errors.current_month_progress ? 'border-red-500' : ''}
                                                    />
                                                    {mode !== 'view' && (
                                                        <Progress 
    value={typeof formData.current_month_progress === 'string' 
        ? (parseFloat(formData.current_month_progress) || 0) 
        : (formData.current_month_progress || 0)} 
    className="h-2" 
/>
                                                    )}
                                                </div>
                                                {errors.current_month_progress && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.current_month_progress}</p>
                                                )}
                                            </div>
                                            
                                            <div>
                                                <Label htmlFor="cumulative_progress">Cumulative Progress (%)</Label>
                                                <div className="space-y-2">
                                                    <Input
                                                        id="cumulative_progress"
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        step="0.01"
                                                        value={formData.cumulative_progress}
                                                        onChange={(e) => handleChange('cumulative_progress', e.target.value)}
                                                        disabled={mode === 'view'}
                                                        className={errors.cumulative_progress ? 'border-red-500' : ''}
                                                    />
                                                    {mode !== 'view' && (
                                                        <Progress 
    value={typeof formData.cumulative_progress === 'string' 
        ? (parseFloat(formData.cumulative_progress) || 0) 
        : (formData.cumulative_progress || 0)} 
    className="h-2" 
/>
                                                    )}
                                                </div>
                                                {errors.cumulative_progress && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.cumulative_progress}</p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {mode !== 'view' && (
                                            <div className="flex justify-end gap-2 pt-4">
                                                <Button type="button" variant="outline" onClick={onClose}>
                                                    Cancel
                                                </Button>
                                                <Button type="submit" disabled={isSubmitting}>
                                                    {isSubmitting ? 'Saving...' : 'Save'}
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
                                        onClick={() => {/* Implement edit mode change */}}
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="destructive" 
                                        onClick={() => {/* Implement delete mode change */}}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
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