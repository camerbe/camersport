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
            $table->foreignId('team_a_id')->constrained('teams')->onDelete('cascade');
            $table->foreignId('team_b_id')->constrained('teams')->onDelete('cascade');
            $table->dateTime('match_date');
            $table->string('formation_a')->nullable();
            $table->string('formation_b')->nullable();
            $table->string('color_a')->nullable();
            $table->string('color_b')->nullable();
            $table->string('coach_a')->nullable();
            $table->string('coach_b')->nullable();
            $table->string('referee')->nullable();
            $table->string('location')->nullable();
            $table->json('team_a_data')->nullable();
            $table->json('team_b_data')->nullable();
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
