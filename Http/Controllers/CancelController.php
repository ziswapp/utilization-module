<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Controllers;

use Ziswapp\Controller\Controller;
use Illuminate\Http\RedirectResponse;
use Modules\Utilization\Models\Utilization;
use Modules\Utilization\Actions\CancelUtilization;

final class CancelController extends Controller
{
    public function store(Utilization $utilization, CancelUtilization $cancel): RedirectResponse
    {
        $cancel->handle($utilization);

        return redirect()->route('utilization.show', [
            'utilization' => $utilization,
        ]);
    }
}
