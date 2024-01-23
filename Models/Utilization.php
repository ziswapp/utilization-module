<?php

declare(strict_types=1);

namespace Modules\Utilization\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Ziswapp\Domain\Foundation\Model\File;
use Ziswapp\Domain\Foundation\Model\User;
use Modules\Utilization\Enums\PaymentType;
use Ziswapp\Domain\Foundation\Model\Branch;
use Ziswapp\Domain\Transaction\Model\Program;
use Modules\Utilization\Enums\UtilizationStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Modules\Utilization\Eloquent\UtilizationQueryBuilder;

final class Utilization extends Model
{
    use HasUuids;

    protected $guarded = [];

    protected $casts = [
        'use_at' => 'datetime',
        'distribution_at' => 'datetime',
        'status' => UtilizationStatus::class,
        'payment_type' => PaymentType::class,
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
        return $this->belongsTo(UtilizationType::class, 'utilization_type_id');
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class, 'distribution_program_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(UtilizationItem::class, 'utilization_id');
    }

    public function beneficiaries(): BelongsToMany
    {
        return $this->belongsToMany(Beneficiary::class, 'beneficiary_utilization');
    }

    public function attachments(): BelongsToMany
    {
        return $this->belongsToMany(
            File::class,
            'utilization_attachments',
            'utilization_id',
            'file_uuid',
            'id',
            'uuid'
        );
    }

    public function getStatus(): UtilizationStatus
    {
        return $this->getAttribute('status');
    }

    public function isDraft(): bool
    {
        return $this->getStatus() === UtilizationStatus::draft;
    }

    public function isNew(): bool
    {
        return $this->getStatus() === UtilizationStatus::new;
    }

    public function isCancel(): bool
    {
        return $this->getStatus() === UtilizationStatus::cancel;
    }

    public function isDistribution(): bool
    {
        return $this->type()->where('is_distribution', true)->exists();
    }

    public static function query(): Builder|UtilizationQueryBuilder
    {
        return parent::query();
    }

    public function newEloquentBuilder($query): UtilizationQueryBuilder
    {
        return new UtilizationQueryBuilder($query);
    }
}
