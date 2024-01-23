<?php

declare(strict_types=1);

namespace Modules\Utilization\Admin\Resources\UtilizationTypeResource\Pages;

use Filament\Resources\Pages\CreateRecord;
use Modules\Utilization\Admin\Resources\UtilizationTypeResource;

final class CreateUtilizationType extends CreateRecord
{
    protected static string $resource = UtilizationTypeResource::class;
}
