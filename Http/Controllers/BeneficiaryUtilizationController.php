<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Ziswapp\Controller\Controller;
use Illuminate\Http\RedirectResponse;
use Ziswapp\Domain\Foundation\Model\User;
use Modules\Utilization\Models\Beneficiary;
use Modules\Utilization\Models\Utilization;
use Modules\Utilization\Supports\NumberGenerator;
use Modules\Utilization\Actions\CreateNewBeneficiary;
use Modules\Utilization\DataTransfers\NewBeneficiaryData;
use Modules\Utilization\Http\PageProps\NewBeneficiaryProps;
use Modules\Utilization\Http\Requests\StoreBeneficiaryRequest;

final class BeneficiaryUtilizationController extends Controller
{
    public function create(Utilization $utilization, Request $request, NewBeneficiaryProps $props): Response
    {
        \abort_unless($utilization->isDraft(), 403);

        \abort_unless($utilization->isDistribution(), 403);

        return Inertia::render('Utilization::beneficiary/attach', $props->loadData($utilization, $request));
    }

    public function store(Utilization $utilization, StoreBeneficiaryRequest $request, CreateNewBeneficiary $newBeneficiary): RedirectResponse
    {
        \abort_unless($utilization->isDraft(), 403);

        \abort_unless($utilization->isDistribution(), 403);

        /** @var User $user */
        $user = $request->user();

        $newBeneficiary->handle(NewBeneficiaryData::from([
            ...$request->safe()->except([
                'user_id', 'branch_id',
            ]),
            'user_id' => $request->input('user_id', $user->getKey()),
            'branch_id' => $request->input('branch_id', $user->getAttribute('branch_id')),
            'identification_number' => NumberGenerator::generate(Beneficiary::class),
        ]), $utilization);

        return redirect()->back();
    }

    public function edit(Utilization $utilization, Request $request, NewBeneficiaryProps $props): Response
    {
        \abort_unless($utilization->isDraft(), 403);

        \abort_unless($utilization->isDistribution(), 403);

        return Inertia::render('Utilization::beneficiary/detach', $props->loadData($utilization, $request));
    }
}
