<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateActionPlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'activity_number' => 'sometimes|required|integer|min:1',
            'activity_name' => 'sometimes|required|string|max:255',
            'project_manager_status' => 'sometimes|required|in:green,yellow,red,blue',
            'due_date' => 'nullable|string|max:50',
            'current_month_progress' => 'sometimes|required|numeric|min:0|max:100',
            'cumulative_progress' => 'sometimes|required|numeric|min:0|max:100',
            'display_order' => 'sometimes|required|integer|min:1',
            'milestone_id' => 'nullable|exists:milestones,id'
        ];
    }
    
    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'activity_number.required' => 'Activity number is required',
            'activity_number.integer' => 'Activity number must be an integer',
            'activity_number.min' => 'Activity number must be at least 1',
            
            'activity_name.required' => 'Activity name is required',
            'activity_name.max' => 'Activity name may not be greater than 255 characters',
            
            'project_manager_status.required' => 'PM status is required',
            'project_manager_status.in' => 'PM status must be one of: green, yellow, red, blue',
            
            'due_date.max' => 'Due date may not be greater than 50 characters',
            
            'current_month_progress.required' => 'Current month progress is required',
            'current_month_progress.numeric' => 'Current month progress must be a number',
            'current_month_progress.min' => 'Current month progress must be at least 0',
            'current_month_progress.max' => 'Current month progress may not be greater than 100',
            
            'cumulative_progress.required' => 'Cumulative progress is required',
            'cumulative_progress.numeric' => 'Cumulative progress must be a number',
            'cumulative_progress.min' => 'Cumulative progress must be at least 0',
            'cumulative_progress.max' => 'Cumulative progress may not be greater than 100',
            
            'display_order.required' => 'Display order is required',
            'display_order.integer' => 'Display order must be an integer',
            'display_order.min' => 'Display order must be at least 1',
            
            'milestone_id.exists' => 'Selected milestone does not exist'
        ];
    }
    
    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            // Custom validation: cumulative progress must be >= current month progress
            if ($this->has('current_month_progress') && $this->has('cumulative_progress')) {
                $currentMonth = (float) $this->input('current_month_progress');
                $cumulative = (float) $this->input('cumulative_progress');
                
                if ($cumulative < $currentMonth) {
                    $validator->errors()->add('cumulative_progress', 'Cumulative progress must be greater than or equal to current month progress');
                }
            }
        });
    }
}