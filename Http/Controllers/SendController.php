<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Inertia\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Modules\Utilization\Models\Utilization;
use Illuminate\Validation\ValidationException;
use Modules\Utilization\Actions\SendUtilization;
use Modules\Utilization\Exceptions\CannotSendUtilization;
use Modules\Utilization\Http\PageProps\ShowUtilizationProps;

final class SendController extends Controller
{
    public function create(Utilization $utilization, Request $request, ShowUtilizationProps $props): Response
    {
        \abort_unless($utilization->isDraft(), 403);

        return Inertia::render('Utilization::send', $props->loadData($utilization, $request));
    }

    public function store(Utilization $utilization, SendUtilization $sendUtilization): RedirectResponse
    {
        \abort_unless($utilization->isDraft(), 403);

        try {
            $sendUtilization->handle($utilization);

            return redirect()->route('utilization.show', [
                'utilization' => $utilization->getRouteKey(),
            ]);
        } catch (CannotSendUtilization $exception) {
            throw ValidationException::withMessages([
                'utilization' => [
                    $exception->getMessage(),
                ],
            ]);
        }
    }
}
