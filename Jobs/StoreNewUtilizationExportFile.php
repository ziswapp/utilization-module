<?php

declare(strict_types=1);

namespace Modules\Utilization\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Ziswapp\Domain\Foundation\Action\CreateNewFileAction;
use Ziswapp\Domain\Foundation\DataTransfer\CreateNewFileData;

final class StoreNewUtilizationExportFile implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public static string $fileCollectionName = 'utilization-export';

    public function __construct(
        private readonly int $userId,
        private readonly string $fileName,
        private readonly string $filePath
    ) {
    }

    public function handle(CreateNewFileAction $action): void
    {
        if (Storage::exists($this->filePath)) {
            $action->handle(new CreateNewFileData([
                'collection' => self::$fileCollectionName,
                'name' => $this->fileName,
                'path' => $this->filePath,
                'disk' => \config('filesystems.default'),
                'size' => Storage::size($this->filePath),
                'user_id' => $this->userId,
                'is_downloadable' => true,
            ]));
        }
    }
}
