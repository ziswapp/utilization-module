<?php

declare(strict_types=1);

namespace Modules\Utilization\Admin\Resources\FundingSourceResource\Pages;

use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Modules\Utilization\Admin\Resources\FundingSourceResource;

final class ListFundingSources extends ListRecords
{
    protected static string $resource = FundingSourceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
