<?php

declare(strict_types=1);

namespace Modules\Utilization\Admin;

use Filament\Panel;
use Filament\Contracts\Plugin;
use Modules\Utilization\Admin\Resources\FundingSourceResource;
use Modules\Utilization\Admin\Resources\UtilizationTypeResource;

final class UtilizationPlugin implements Plugin
{
    public static function make(): self
    {
        return app(self::class);
    }

    public function getId(): string
    {
        return 'utilization';
    }

    public function register(Panel $panel): void
    {
        $panel->resources([
            FundingSourceResource::class,
            UtilizationTypeResource::class,
        ]);
    }

    public function boot(Panel $panel): void
    {
    }
}
