<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\RedirectResponse;
use Modules\Utilization\Models\Utilization;
use Modules\Utilization\Actions\EditUtilization;
use Modules\Utilization\Supports\NumberGenerator;
use Modules\Utilization\Actions\StoreNewUtilization;
use Modules\Utilization\DataTransfers\NewUtilizationData;
use Modules\Utilization\DataTransfers\EditUtilizationData;
use Modules\Utilization\Http\PageProps\NewUtilizationProps;
use Modules\Utilization\Http\PageProps\EditUtilizationProps;
use Modules\Utilization\Http\PageProps\ShowUtilizationProps;
use Modules\Utilization\Http\PageProps\FilterUtilizationProps;
use Modules\Utilization\Http\Requests\StoreUtilizationRequest;

final class UtilizationController extends Controller
{
    public function index(Request $request, FilterUtilizationProps $props): Response
    {
        return Inertia::render('Utilization::list', $props->loadData($request));
    }

    public function create(NewUtilizationProps $props): Response
    {
        return Inertia::render('Utilization::new', $props->loadData());
    }

    public function store(StoreNewUtilization $newUtilization, StoreUtilizationRequest $request): RedirectResponse
    {
        $utilization = $newUtilization->handle(
            NewUtilizationData::from([
                ...$request->safe()->toArray(), 'identification_number' => NumberGenerator::generate(),
            ])
        );

        return \redirect()->route('utilization.item.new', [
            'utilization' => $utilization->getRouteKey(),
        ]);
    }

    public function show(Utilization $utilization, Request $request, ShowUtilizationProps $props): Response
    {
        return Inertia::render('Utilization::show', $props->loadData($utilization, $request));
    }

    public function edit(Utilization $utilization, EditUtilizationProps $props): Response
    {
        \abort_unless($utilization->isDraft(), 403);

        return Inertia::render('Utilization::edit', $props->loadData($utilization));
    }

    public function update(Utilization $utilization, StoreUtilizationRequest $request, EditUtilization $editUtilization): RedirectResponse
    {
        \abort_unless($utilization->isDraft(), 403);

        $editUtilization->handle($utilization, EditUtilizationData::from($request));

        return \redirect()->route('utilization.show', [
            'utilization' => $utilization->getRouteKey(),
        ]);
    }
}
