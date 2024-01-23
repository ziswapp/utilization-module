<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('utilizations', function (Blueprint $table): void {
            $table->timestamp('distribution_at')->nullable();
            $table->foreignId('distribution_program_id')->nullable();
            $table->longText('distribution_program_description')->nullable();
        });
    }
};
