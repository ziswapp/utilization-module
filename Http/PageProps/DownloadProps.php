<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\PageProps;

use Illuminate\Http\Request;
use Ziswapp\Domain\Foundation\Repository\FileRepository;
use Ziswapp\Domain\Foundation\Repository\BranchRepository;
use Modules\Utilization\Jobs\StoreNewUtilizationExportFile;
use Modules\Utilization\Repositories\UtilizationTypeRepository;

final class DownloadProps
{
    public function __construct(
        private readonly FileRepository $fileRepository,
        private readonly BranchRepository $branchRepository,
        private readonly UtilizationTypeRepository $typeRepository,
    ) {
    }

    public function loadData(Request $request): array
    {
        $branches = $this->branchRepository->fetchForSelectOption();
        $types = $this->typeRepository->fetchForSelectOption();

        $files = $this->fileRepository->getLatestDownloadableFile(
            $request->user(), 10, StoreNewUtilizationExportFile::$fileCollectionName
        );

        return \compact('types', 'branches', 'files');
    }
}
