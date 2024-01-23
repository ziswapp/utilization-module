<?php

declare(strict_types=1);

namespace Modules\Utilization\Admin\Resources\UtilizationTypeResource\Pages;

use Filament\Resources\Pages\EditRecord;
use Modules\Utilization\Admin\Resources\UtilizationTypeResource;

final class EditUtilizationType extends EditRecord
{
    protected static string $resource = UtilizationTypeResource::class;
}
