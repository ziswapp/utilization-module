<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Ziswapp\Controller\Controller;
use Illuminate\Http\RedirectResponse;
use Ziswapp\Domain\Foundation\Model\Branch;
use Modules\Utilization\Exports\UtilizationExport;
use Modules\Utilization\Http\Requests\ExportRequest;
use Modules\Utilization\Http\PageProps\DownloadProps;
use Ziswapp\Domain\Foundation\Repository\BranchRepository;
use Modules\Utilization\Jobs\StoreNewUtilizationExportFile;

final class DownloadController extends Controller
{
    public function create(Request $request, DownloadProps $props): Response
    {
        return Inertia::render('Utilization::download', $props->loadData($request));
    }

    public function store(ExportRequest $request, BranchRepository $branchRepository): RedirectResponse
    {
        /** @var Branch $branch */
        $branch = $branchRepository->findUsingId($request->integer('branch'));

        $fileName = \sprintf('PENGGUNAAN-DATA-v%s.xlsx', now()->timestamp);
        $filePath = \sprintf('files/%s', $fileName);

        UtilizationExport::fromRequest($branch, $request)->queue($filePath)->chain([
            new StoreNewUtilizationExportFile(
                $request->user()->getKey(), $fileName, $filePath
            ),
        ]);

        return redirect()->back();
    }
}
