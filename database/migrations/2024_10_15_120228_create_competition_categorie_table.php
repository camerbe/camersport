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
        Schema::create('categorie_competition', function (Blueprint $table) {
            $table->unsignedBigInteger('competition_id');
            $table->unsignedBigInteger('categorie_id');
            $table->primary(['competition_id', 'categorie_id']);
            $table->foreign('competition_id')->references('id')
                ->on('competitions')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreign('categorie_id')->references('id')
                ->on('categories')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competition_categorie');
    }
};
