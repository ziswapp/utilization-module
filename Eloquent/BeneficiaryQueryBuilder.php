<?php

declare(strict_types=1);

namespace Modules\Utilization\Eloquent;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Builder;

final class BeneficiaryQueryBuilder extends Builder
{
    public function withSearch(?string $keyword): self
    {
        $this->when($keyword, fn (BeneficiaryQueryBuilder $builder): Builder => $builder->whereSearch($keyword));

        return $this;
    }

    public function whereType(int $type): self
    {
        $this->where('beneficiary_type_id', $type);

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

        return $this->where(function (Builder $builder) use ($value): Builder {
            $grammar = $this->getQuery()->getGrammar();

            $number = $grammar->wrap($this->qualifyColumn('identification_number'));
            $description = $grammar->wrap($this->qualifyColumn('name'));
            $nik = $grammar->wrap($this->qualifyColumn('nik'));

            return $builder->orWhereRaw("LOWER({$number}::text) LIKE ?", ["%{$value}%"])
                ->orWhereRaw("LOWER({$description}::text) LIKE ?", ["%{$value}%"])
                ->orWhereRaw("LOWER({$nik}::text) LIKE ?", ["%{$value}%"]);
        });
    }
}
