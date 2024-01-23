<?php

declare(strict_types=1);

namespace Modules\Utilization\Admin\Resources\FundingSourceResource\Pages;

use Filament\Resources\Pages\EditRecord;
use Modules\Utilization\Admin\Resources\FundingSourceResource;

final class EditFundingSource extends EditRecord
{
    protected static string $resource = FundingSourceResource::class;
}
