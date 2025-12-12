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
    
    Route::get('dashboard', [App\Http\Controllers\DashboardsController::class, 'index'])->name('dashboard');
});

require __DIR__ . '/settings.php';
