<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\PageProps;

use Modules\Utilization\Models\Utilization;
use Illuminate\Database\Eloquent\Relations\Relation;

final class NewAttachmentProps
{
    public function loadData(Utilization $utilization): array
    {
        $utilization->loadMissing([
            'user' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            'branch' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            'type' => fn (Relation $relation): Relation => $relation->select(['id', 'name', 'is_distribution']),
        ]);

        $attachments = $utilization->loadMissing('attachments')->getRelation('attachments');

        $utilization->unsetRelation('attachments');

        return \compact('utilization', 'attachments');
    }
}
