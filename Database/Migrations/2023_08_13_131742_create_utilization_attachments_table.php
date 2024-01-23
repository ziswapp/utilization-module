<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('utilization_attachments', static function (Blueprint $table): void {
            $table->foreignUuid('utilization_id')->constrained('utilizations');
            $table->foreignUuid('file_uuid')->constrained('files', 'uuid');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('utilization_attachments');
    }
};
