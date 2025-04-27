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
        Schema::create('matchsheets', function (Blueprint $table) {
            $table->id();
            $table->dateTime('match_date');
            $table->string('location')->nullable();
            $table->string('team_a_name');
            $table->string('team_b_name');
            $table->json('team_a_data')->nullable();
            $table->json('team_b_data')->nullable();
            $table->json('coaching_staff')->nullable();
            $table->string('formation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matchsheets');
    }
};
