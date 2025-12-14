<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreActionPlanRequest extends FormRequest
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
            // activity_number dan display_order nullable karena bisa di-generate otomatis oleh sistem
            'activity_number' => 'nullable|integer|min:1',
            'activity_name' => 'required|string|max:255',
            'project_manager_status' => 'required|in:green,yellow,red,blue',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'display_order' => 'nullable|integer|min:1',
            // initiative_id bersifat nullable karena controller akan mengisi otomatis dari URL parameter
            'initiative_id' => 'nullable|exists:initiatives,id',
            'milestone_id' => 'nullable|exists:milestones,id',
            
            // Monthly progress validation
            'monthly_progress' => 'nullable|array',
            'monthly_progress.*' => 'numeric|min:0|max:100'
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
            
            // initiative_id sekarang nullable, hanya perlu pesan jika ID tidak valid
            'initiative_id.exists' => 'Selected initiative does not exist',
            
            'start_date.date' => 'Start date must be a valid date',
            'end_date.date' => 'End date must be a valid date',
            'end_date.after_or_equal' => 'End date must be after or equal to start date',
            
            'milestone_id.exists' => 'Selected milestone does not exist'
        ];
    }
    
    /**
     * Configure the validator instance.
     * CATATAN: current_month_progress dan cumulative_progress adalah nilai INDEPENDEN
     * - current_month_progress = progress kegiatan di bulan tersebut (bisa 100%)
     * - cumulative_progress = total progress keseluruhan project (bisa 50% jika baru 1 dari 2 bulan)
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator): void
    {
        // Tidak ada custom validation untuk hubungan antara current_month_progress dan cumulative_progress
        // karena keduanya adalah nilai yang independen
    }
}