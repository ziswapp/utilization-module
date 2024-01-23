<?php

declare(strict_types=1);

namespace Modules\Utilization\Admin\Resources\UtilizationTypeResource\Pages;

use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Modules\Utilization\Admin\Resources\UtilizationTypeResource;

final class ListUtilizationTypes extends ListRecords
{
    protected static string $resource = UtilizationTypeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
