<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('hc/Dashboard', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    })->name('home');
    
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::get('list', [App\Http\Controllers\DashboardController::class, 'list'])->name('list');
    Route::get('detail', [App\Http\Controllers\DashboardController::class, 'detail'])->name('detail');
    
    // Action Plan Routes
    Route::get('initiatives/{initiative}/action-plans', [App\Http\Controllers\ActionPlanController::class, 'index'])->name('action-plans.index');
    Route::post('initiatives/{code}/action-plans', [App\Http\Controllers\ActionPlanController::class, 'store'])->name('action-plans.store');
    Route::get('initiatives/{initiative}/action-plans/{actionPlan}', [App\Http\Controllers\ActionPlanController::class, 'show'])->name('action-plans.show');
    Route::put('action-plans/{actionPlan}', [App\Http\Controllers\ActionPlanController::class, 'update'])->name('action-plans.update');
    Route::delete('action-plans/{actionPlan}', [App\Http\Controllers\ActionPlanController::class, 'destroy'])->name('action-plans.destroy');
    Route::get('action-plans/{actionPlan}/kpi', [App\Http\Controllers\ActionPlanController::class, 'calculateKpiMetrics'])->name('action-plans.kpi');
});

require __DIR__ . '/settings.php';
