<?php

declare(strict_types=1);

namespace Modules\Utilization\Actions;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Modules\Utilization\Models\Utilization;
use Ziswapp\Domain\Foundation\Action\CreateNewFileAction;
use Ziswapp\Domain\Foundation\DataTransfer\CreateNewFileData;

final class NewAttachment
{
    public function __construct(
        private readonly CreateNewFileAction $action
    ) {
    }

    public function handle(Utilization $utilization, Request $request): void
    {
        app('db')->transaction(function () use ($utilization, $request): void {
            /** @var UploadedFile $file */
            $file = $request->file('file');

            $utilization->attachments()->syncWithoutDetaching(
                $this->action->handle(new CreateNewFileData([
                    'collection' => 'uploaded',
                    'name' => $request->input('name') ?: $file->getClientOriginalName(),
                    'path' => $file->store('uploads'),
                    'disk' => (string) \config('filesystems.default'),
                    'size' => $file->getSize(),
                    'mime_type' => $file->getClientMimeType(),
                    'user_id' => $request->user()?->getKey(),
                    'is_downloadable' => false,
                ]))->getAttribute('uuid')
            );
        });
    }
}
