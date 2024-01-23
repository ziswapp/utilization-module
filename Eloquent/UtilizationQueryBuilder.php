<?php

declare(strict_types=1);

namespace Modules\Utilization\Eloquent;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Builder;
use Modules\Utilization\Enums\UtilizationStatus;
use Ziswapp\Domain\Foundation\Scope\LimitUserScope;

final class UtilizationQueryBuilder extends Builder
{
    public function withLimitUserScope(): self
    {
        $this->withGlobalScope(LimitUserScope::class, new LimitUserScope());

        return $this;
    }

    public function withSearch(?string $keyword): self
    {
        $this->withLimitUserScope()->when(
            $keyword,
            fn (UtilizationQueryBuilder $builder): Builder => $builder->whereSearch($keyword)
        );

        return $this;
    }

    public function whereStatus(UtilizationStatus $status): self
    {
        $this->where('status', $status->value);

        return $this;
    }

    public function whereType(int $type): self
    {
        $this->where('utilization_type_id', $type);

        return $this;
    }

    public function whereBranches(Collection $branches): self
    {
        $this->whereIn($this->getModel()->getTable().'.branch_id', $branches->pluck('id'));

        return $this;
    }

    public function whereSearch(?string $keyword = null): self
    {
        $value = \mb_strtolower($keyword ?: '', 'UTF8');

        $grammar = $this->getQuery()->getGrammar();

        $number = $grammar->wrap($this->qualifyColumn('identification_number'));
        $description = $grammar->wrap($this->qualifyColumn('description'));

        return $this->orWhereRaw("LOWER({$number}::text) LIKE ?", ["%{$value}%"])
            ->orWhereRaw("LOWER({$description}::text) LIKE ?", ["%{$value}%"]);
    }

    public function joinWithType(string $type = 'inner'): self
    {
        return $this->join(
            'utilization_types',
            'utilization_types.id',
            '=',
            $this->getModel()->getTable().'.utilization_type_id',
            $type
        );
    }
}
