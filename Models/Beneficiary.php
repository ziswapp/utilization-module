<?php

declare(strict_types=1);

namespace Modules\Utilization\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Ziswapp\Domain\Foundation\Model\User;
use Ziswapp\Domain\Foundation\Model\Branch;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Modules\Utilization\Eloquent\BeneficiaryQueryBuilder;
use Ziswapp\Domain\Address\Model\Concern\HasAddressRelations;

final class Beneficiary extends Model
{
    use HasAddressRelations;
    use HasUuids;

    protected $guarded = [];

    protected $casts = [
        'province_code' => 'string',
        'city_code' => 'string',
        'district_code' => 'string',
        'village_code' => 'string',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(BeneficiaryType::class, 'beneficiary_type_id');
    }

    public function utilizations(): BelongsToMany
    {
        return $this->belongsToMany(Utilization::class, 'beneficiary_utilization');
    }

    public static function query(): Builder|BeneficiaryQueryBuilder
    {
        return parent::query();
    }

    public function newEloquentBuilder($query): BeneficiaryQueryBuilder
    {
        return new BeneficiaryQueryBuilder($query);
    }
}
