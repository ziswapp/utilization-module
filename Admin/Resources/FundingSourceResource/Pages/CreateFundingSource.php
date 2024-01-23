<?php

declare(strict_types=1);

namespace Modules\Utilization\Admin\Resources\FundingSourceResource\Pages;

use Filament\Resources\Pages\CreateRecord;
use Modules\Utilization\Admin\Resources\FundingSourceResource;

final class CreateFundingSource extends CreateRecord
{
    protected static string $resource = FundingSourceResource::class;
}
