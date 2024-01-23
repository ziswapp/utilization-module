<?php

declare(strict_types=1);

namespace Modules\Utilization\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

final class RouteServiceProvider extends ServiceProvider
{
    /**
     * @psalm-suppress UnresolvableInclude
     */
    public function boot(): void
    {
        $this->routes(function (): void {
            Route::prefix('api')
                ->middleware('api')
                ->group(require \module_path('Utilization', '/Routes/api.php'));

            Route::middleware('web')
                ->group(require \module_path('Utilization', '/Routes/web.php'));
        });
    }
}
