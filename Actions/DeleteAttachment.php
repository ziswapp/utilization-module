<?php

declare(strict_types=1);

namespace Modules\Utilization\Actions;

use Illuminate\Support\Facades\Storage;
use Ziswapp\Domain\Foundation\Model\File;
use Modules\Utilization\Models\Utilization;

final class DeleteAttachment
{
    public function handle(Utilization $utilization, File $file): void
    {
        app('db')->transaction(function () use ($utilization, $file): void {
            $this->deleteFile($file);

            $fileId = $file->getAttribute('uuid');

            $utilization->attachments()->detach($fileId);

            $file->forceDelete();
        });
    }

    protected function deleteFile(File $file): void
    {
        /** @var string $disk */
        $disk = $file->getAttribute('disk');

        /** @var string $path */
        $path = $file->getAttribute('path');

        Storage::disk($disk)->delete($path);
    }
}
