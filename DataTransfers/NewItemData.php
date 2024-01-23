<?php

declare(strict_types=1);

namespace Modules\Utilization\DataTransfers;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\MapOutputName;

final class NewItemData extends Data
{
    public function __construct(
        public readonly string $description,

        #[MapInputName('funding_source_id')]
        #[MapOutputName('funding_source_id')]
        public readonly string $sourceId,

        #[MapInputName('beneficiary_type_id')]
        #[MapOutputName('beneficiary_type_id')]
        public readonly string $beneficiaryId,

        #[MapInputName('amount')]
        #[MapOutputName('amount')]
        public readonly float $amount,
    ) {
    }
}
