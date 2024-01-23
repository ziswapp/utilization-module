<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('utilization_items', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('utilization_id')->constrained();
            $table->string('description');
            $table->foreignId('funding_source_id')->constrained();
            $table->foreignId('beneficiary_type_id')->constrained();
            $table->unsignedDecimal('amount', 18);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('utilization_items');
    }
};
