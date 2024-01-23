<?php

declare(strict_types=1);

namespace Modules\Utilization\Providers;

use Ziswapp\Navigation\Navigation;
use Ziswapp\Navigation\NavigationItem;
use Illuminate\Support\ServiceProvider;
use Ziswapp\Navigation\NavigationGroup;
use Modules\Utilization\Models\FundingSource;
use Modules\Utilization\Models\UtilizationType;
use Illuminate\Database\Eloquent\Relations\Relation;

final class UtilizationServiceProvider extends ServiceProvider
{
    protected string $moduleName = 'Utilization';

    protected string $moduleNameLower = 'utilization';

    public function boot(): void
    {
        Relation::morphMap([
            'funding-source' => FundingSource::class,
            'utilization-type' => UtilizationType::class,
        ]);

        $this->registerTranslations();

        $this->registerConfig();

        $this->registerViews();

        $this->loadMigrationsFrom(
            \module_path($this->moduleName, 'Database/Migrations')
        );

        Navigation::registerNavigationGroups([
            NavigationGroup::new()
                ->label('Dashboard')
                ->menus([
                    NavigationItem::new()
                        ->label('Penggunaan Dana')
                        ->href('/utilization/dashboard')
                        ->icon('activity')
                        ->permission('menu.utilization.dashboard'),
                ]),
            NavigationGroup::new()
                ->label('Penggunaan Dana')
                ->menus([
                    NavigationItem::new()
                        ->label('Tambah Penggunaan')
                        ->href('/utilization/new')
                        ->icon('plus-square')
                        ->permission('menu.utilization.create'),
                    NavigationItem::new()
                        ->label('Daftar Penggunaan')
                        ->href('/utilization')
                        ->icon('repeat')
                        ->permission('menu.utilization'),
                    NavigationItem::new()
                        ->label('Penerima Manfaat')
                        ->href('/utilization/beneficiary')
                        ->icon('users')
                        ->permission('menu.utilization.beneficiary'),
                ]),
            NavigationGroup::new()
                ->sort(999)
                ->label('Download')
                ->menus([
                    NavigationItem::new()
                        ->label('Penggunaan Dana')
                        ->href('/utilization/export')
                        ->icon('download')
                        ->permission('menu.utilization.export'),
                ]),
        ]);
    }

    public function register(): void
    {
        $this->app->register(RouteServiceProvider::class);
    }

    protected function registerConfig(): void
    {
        $this->publishes([
            \module_path($this->moduleName, 'Config/config.php') => config_path($this->moduleNameLower.'.php'),
        ], 'config');
        $this->mergeConfigFrom(
            \module_path($this->moduleName, 'Config/config.php'), $this->moduleNameLower
        );
    }

    public function registerViews(): void
    {
        $viewPath = \resource_path('views/modules/'.$this->moduleNameLower);

        $sourcePath = \module_path($this->moduleName, 'Resources/views');

        $this->publishes([
            $sourcePath => $viewPath,
        ], ['views', $this->moduleNameLower.'-module-views']);

        $this->loadViewsFrom(array_merge($this->getPublishableViewPaths(), [$sourcePath]), $this->moduleNameLower);
    }

    public function registerTranslations(): void
    {
        $langPath = \resource_path('lang/modules/'.$this->moduleNameLower);

        if (\is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, $this->moduleNameLower);
            $this->loadJsonTranslationsFrom($langPath);
        } else {
            $this->loadTranslationsFrom(
                \module_path($this->moduleName, 'Resources/lang'), $this->moduleNameLower
            );
            $this->loadJsonTranslationsFrom(
                \module_path($this->moduleName, 'Resources/lang')
            );
        }
    }

    private function getPublishableViewPaths(): array
    {
        $paths = [];

        foreach (\config('view.paths') as $path) {
            if (\is_dir($path.'/modules/'.$this->moduleNameLower)) {
                $paths[] = $path.'/modules/'.$this->moduleNameLower;
            }
        }

        return $paths;
    }
}
