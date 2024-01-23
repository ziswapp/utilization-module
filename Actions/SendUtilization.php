<?php

declare(strict_types=1);

namespace Modules\Utilization\Actions;

use Modules\Utilization\Models\Utilization;
use Modules\Utilization\Models\UtilizationType;
use Modules\Utilization\Enums\UtilizationStatus;
use Modules\Utilization\Exceptions\CannotSendUtilization;

final class SendUtilization
{
    public function handle(Utilization $utilization): void
    {
        /** @var UtilizationType $type */
        $type = $utilization->type()->first();

        if ($type->getAttribute('is_distribution') && $utilization->beneficiaries()->exists() === false) {
            throw CannotSendUtilization::withMessage(
                'Anda harus menginput data penerima manfaat untuk penyaluran ini',
            );
        }

        if ($utilization->items()->exists() === false || $utilization->attachments()->exists() === false) {
            throw CannotSendUtilization::withMessage(
                'Lampiran atau detail item penggunaan dana harus ada'
            );
        }

        $utilization->update([
            'status' => UtilizationStatus::new,
        ]);
    }
}
