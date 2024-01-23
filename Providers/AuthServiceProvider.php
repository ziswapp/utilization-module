<?php

declare(strict_types=1);

namespace Modules\Utilization\Providers;

use Illuminate\Foundation\Support;
use Modules\Utilization\Models\FundingSource;
use Modules\Utilization\Models\UtilizationType;
use Modules\Utilization\Policy\FundingSourcePolicy;
use Modules\Utilization\Policy\UtilizationTypePolicy;

final class AuthServiceProvider extends Support\Providers\AuthServiceProvider
{
    protected $policies = [
        FundingSource::class => FundingSourcePolicy::class,
        UtilizationType::class => UtilizationTypePolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
