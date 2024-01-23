<?php

declare(strict_types=1);

namespace Modules\Utilization\Exports;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMapping;
use Ziswapp\Domain\Foundation\Model\Branch;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Modules\Utilization\Models\UtilizationItem;
use Modules\Utilization\Enums\UtilizationStatus;
use Modules\Utilization\Http\Requests\ExportRequest;
use Modules\Utilization\Eloquent\UtilizationQueryBuilder;

final class UtilizationExport implements FromQuery, ShouldAutoSize, WithHeadings, WithMapping
{
    use Exportable;

    public function __construct(
        private readonly Branch $branch,
        private readonly DateTimeInterface $start,
        private readonly DateTimeInterface $end,
        private readonly ?int $type = null,
        private readonly ?UtilizationStatus $status = null,
    ) {
    }

    public static function fromRequest(Branch $branch, ExportRequest $request): self
    {
        $timezone = $request->user()?->getAttribute('timezone');

        return new self(
            $branch,
            $request->date('start', null, $timezone)->startOfDay() ?? now($timezone)->startOfMonth(),
            $request->date('end', null, $timezone)->endOfDay() ?? now($timezone)->endOfMonth(),
            $request->integer('type'),
            $request->input('status') ? UtilizationStatus::from(
                $request->input('status')
            ) : null
        );
    }

    public function query(): Builder
    {
        $branchIds = $this->branch->getSelfAndDescendantsId();

        /** @psalm-suppress PossiblyNullArgument */
        return UtilizationItem::query()
            ->with(['utilization', 'utilization.type', 'utilization.user', 'utilization.branch', 'source', 'beneficiary'])
            ->whereHas('utilization', fn (UtilizationQueryBuilder $builder): UtilizationQueryBuilder => $builder
                ->whereIn('branch_id', $branchIds)
                ->whereBetween('use_at', [$this->start, $this->end])
                ->when($this->status, fn (UtilizationQueryBuilder $builder): UtilizationQueryBuilder => $builder->whereStatus($this->status))
                ->when($this->type, fn (UtilizationQueryBuilder $builder): UtilizationQueryBuilder => $builder->whereType($this->type))
            );
    }

    public function headings(): array
    {
        return [
            'NUMBER',
            'CABANG',
            'USER',
            'TYPE',
            'STATUS',
            'TANGGAL PENGGUNAAN',
            'SUMBER DANA',
            'ASNAF',
            'NOMINAL',
        ];
    }

    /** @param  UtilizationItem  $row
     * @return string[]
     *
     * @psalm-suppress MoreSpecificImplementedParamType
     */
    public function map($row): array
    {
        return [
            $row->getAttribute('utilization')->getAttribute('identification_number'),
            $row->getAttribute('utilization')->getAttribute('branch')->getAttribute('name'),
            $row->getAttribute('utilization')->getAttribute('user')->getAttribute('name'),
            $row->getAttribute('utilization')->getAttribute('type')->getAttribute('name'),
            $row->getAttribute('utilization')->getAttribute('status')->value,
            $row->getAttribute('utilization')->getAttribute('use_at'),
            $row->getAttribute('source')->getAttribute('name'),
            $row->getAttribute('beneficiary')?->getAttribute('name'),
            $row->getAttribute('amount'),

        ];
    }
}
