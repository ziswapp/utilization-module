<?php

declare(strict_types=1);

namespace Modules\Utilization\Eloquent;

use Illuminate\Database\Eloquent\Builder;

final class UtilizationItemQueryBuilder extends Builder
{
    public function joinWithUtilization(string $type = 'inner'): self
    {
        return $this->join(
            'utilizations',
            'utilizations.id',
            '=',
            $this->getModel()->getTable().'.utilization_id',
            $type
        );
    }

    public function joinWithBeneficiaryType(string $type = 'inner'): self
    {
        return $this->join(
            'beneficiary_types',
            'beneficiary_types.id',
            '=',
            $this->getModel()->getTable().'.beneficiary_type_id',
            $type
        );
    }

    public function joinWithFundingSource(string $type = 'inner'): self
    {
        return $this->join(
            'funding_sources',
            'funding_sources.id',
            '=',
            $this->getModel()->getTable().'.funding_source_id',
            $type
        );
    }
}
