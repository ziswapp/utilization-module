<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Ziswapp\Controller\Controller;
use Modules\Utilization\Http\PageProps\DashboardProps;

final class DashboardController extends Controller
{
    public function show(Request $request, DashboardProps $props): Response
    {
        return Inertia::render('Utilization::dashboard', $props->loadData($request));
    }
}
