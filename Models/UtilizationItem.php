<?php

declare(strict_types=1);

namespace Modules\Utilization\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Utilization\Eloquent\UtilizationItemQueryBuilder;

final class UtilizationItem extends Model
{
    use HasUuids;

    protected $guarded = [];

    public function utilization(): BelongsTo
    {
        return $this->belongsTo(Utilization::class);
    }

    public function source(): BelongsTo
    {
        return $this->belongsTo(FundingSource::class, 'funding_source_id');
    }

    public function beneficiary(): BelongsTo
    {
        return $this->belongsTo(BeneficiaryType::class, 'beneficiary_type_id');
    }

    public static function query(): Builder|UtilizationItemQueryBuilder
    {
        return parent::query();
    }

    public function newEloquentBuilder($query): UtilizationItemQueryBuilder
    {
        return new UtilizationItemQueryBuilder($query);
    }
}
