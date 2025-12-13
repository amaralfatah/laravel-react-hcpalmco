<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboards', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    })->name('home');
    
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::get('list', [App\Http\Controllers\DashboardController::class, 'list'])->name('list');
    Route::get('detail', [App\Http\Controllers\DashboardController::class, 'detail'])->name('detail');
});

require __DIR__ . '/settings.php';
