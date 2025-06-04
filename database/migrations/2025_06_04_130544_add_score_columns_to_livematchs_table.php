<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('livematchs', function (Blueprint $table) {
            //
            $table->integer('score_a')->nullable();
            $table->integer('score_b')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('livematchs', function (Blueprint $table) {
            //

            $table->dropColumn(['score_a', 'score_b']);
        });
    }
};
