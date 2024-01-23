<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Ziswapp\Controller\Controller;
use Illuminate\Http\RedirectResponse;
use Modules\Utilization\Models\Beneficiary;
use Modules\Utilization\Actions\EditBeneficiary;
use Modules\Utilization\DataTransfers\EditBeneficiaryData;
use Modules\Utilization\Http\PageProps\EditBeneficiaryProps;
use Modules\Utilization\Http\PageProps\ListBeneficiaryProps;
use Modules\Utilization\Http\PageProps\ShowBeneficiaryProps;
use Modules\Utilization\Http\Requests\EditBeneficiaryRequest;

final class BeneficiaryController extends Controller
{
    public function index(Request $request, ListBeneficiaryProps $props): Response
    {
        return Inertia::render('Utilization::beneficiary/list', $props->loadData($request));
    }

    public function show(Beneficiary $beneficiary, Request $request, ShowBeneficiaryProps $props): Response
    {
        return Inertia::render('Utilization::beneficiary/show', $props->loadData($beneficiary, $request));
    }

    public function edit(Beneficiary $beneficiary, EditBeneficiaryProps $props): Response
    {
        return Inertia::render('Utilization::beneficiary/edit', $props->loadData($beneficiary));
    }

    public function update(Beneficiary $beneficiary, EditBeneficiaryRequest $request, EditBeneficiary $editBeneficiary): RedirectResponse
    {
        $editBeneficiary->handle($beneficiary, EditBeneficiaryData::from(
            $request->safe()
        ));

        return redirect()->route('utilization.beneficiary.show', [
            'beneficiary' => $beneficiary->getRouteKey(),
        ]);
    }
}
