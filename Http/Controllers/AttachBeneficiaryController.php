<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Ziswapp\Controller\Controller;
use Illuminate\Http\RedirectResponse;
use Modules\Utilization\Models\Beneficiary;
use Modules\Utilization\Models\Utilization;
use Modules\Utilization\Actions\AttachBeneficiary;
use Modules\Utilization\Actions\DetachBeneficiary;

final class AttachBeneficiaryController extends Controller
{
    public function store(Utilization $utilization, Request $request, AttachBeneficiary $attachBeneficiary): RedirectResponse
    {
        \abort_if(! $utilization->isDistribution(), 403);

        $request->validate([
            'beneficiaries' => [
                'required', 'array', Rule::exists(Beneficiary::class, 'id'),
            ],
        ]);

        $attachBeneficiary->handle($utilization, $request->input('beneficiaries'));

        return redirect()->back();
    }

    public function delete(Utilization $utilization, Request $request, DetachBeneficiary $detachBeneficiary): RedirectResponse
    {
        \abort_if(! $utilization->isDistribution(), 403);

        $request->validate([
            'beneficiaries' => [
                'required', 'array', Rule::exists(Beneficiary::class, 'id'),
            ],
        ]);

        $detachBeneficiary->handle($utilization, $request->input('beneficiaries'));

        return redirect()->back();
    }
}
