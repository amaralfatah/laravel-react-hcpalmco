<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboards');
    }

    public function list()
    {
        return Inertia::render('list');
    }

    public function detail()
    {
        return Inertia::render('detail');
    }
}
