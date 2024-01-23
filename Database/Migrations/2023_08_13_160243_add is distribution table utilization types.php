<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('utilization_types', function (Blueprint $table): void {
            $table->boolean('is_distribution')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('utilization_types', function (Blueprint $table): void {
            $table->dropColumn('is_distribution');
        });
    }
};
