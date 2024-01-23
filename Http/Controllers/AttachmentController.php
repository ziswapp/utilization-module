<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\RedirectResponse;
use Ziswapp\Domain\Foundation\Model\File;
use Modules\Utilization\Models\Utilization;
use Modules\Utilization\Actions\NewAttachment;
use Modules\Utilization\Actions\DeleteAttachment;
use Modules\Utilization\Http\PageProps\NewAttachmentProps;

final class AttachmentController extends Controller
{
    public function create(Utilization $utilization, NewAttachmentProps $props): Response
    {
        \abort_unless($utilization->isDraft(), 403);

        $data = $props->loadData($utilization);

        return Inertia::render('Utilization::attachment/new', $data);
    }

    public function store(Utilization $utilization, Request $request, NewAttachment $newAttachment): RedirectResponse
    {
        \abort_unless($utilization->isDraft(), 403);

        $request->validate([
            'file' => 'required|file',
            'name' => 'required',
        ]);

        $newAttachment->handle($utilization, $request);

        return redirect()->back();
    }

    public function edit(Utilization $utilization, NewAttachmentProps $props): Response
    {
        \abort_unless($utilization->isDraft(), 403);

        $data = $props->loadData($utilization);

        return Inertia::render('Utilization::attachment/edit', $data);
    }

    public function destroy(Utilization $utilization, File $file, DeleteAttachment $action): RedirectResponse
    {
        \abort_unless($utilization->isDraft(), 403);

        $action->handle($utilization, $file);

        return redirect()->back();
    }
}
