<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Ziswapp\Controller\Controller;
use Illuminate\Http\RedirectResponse;
use Modules\Utilization\Actions\DeleteItem;
use Modules\Utilization\Models\Utilization;
use Modules\Utilization\Actions\StoreNewItem;
use Modules\Utilization\Models\UtilizationItem;
use Modules\Utilization\Enums\UtilizationStatus;
use Modules\Utilization\DataTransfers\NewItemData;
use Modules\Utilization\Http\PageProps\NewItemProps;
use Modules\Utilization\Http\Requests\StoreItemRequest;

final class ItemController extends Controller
{
    public function create(Utilization $utilization, NewItemProps $props): Response
    {
        \abort_unless($utilization->isDraft(), 403);

        return Inertia::render('Utilization::item/new', $props->loadData($utilization));
    }

    public function store(Utilization $utilization, StoreItemRequest $request, StoreNewItem $newItem): RedirectResponse
    {
        \abort_unless($utilization->isDraft(), 403);

        $newItem->handle($utilization, NewItemData::from(
            $request->safe()
        ));

        return redirect()->back();
    }

    public function edit(Utilization $utilization, NewItemProps $props): Response
    {
        \abort_unless($utilization->isDraft(), 403);

        return Inertia::render('Utilization::item/edit', $props->loadData($utilization));
    }

    public function delete(UtilizationItem $item, DeleteItem $deleteItem): RedirectResponse
    {
        \abort_unless($item->utilization()->where('status', UtilizationStatus::draft)->exists(), 403);

        $deleteItem->handle($item);

        return redirect()->back();
    }
}
