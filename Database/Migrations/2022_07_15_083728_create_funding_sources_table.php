<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class() extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('funding_sources') === false) {
            Schema::create('funding_sources', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('funding_category_id');
                $table->string('name');
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('funding_sources');
    }
};
