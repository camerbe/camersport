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
        Schema::create('playerpositions', function (Blueprint $table) {
            $table->id();
            $table->string('position_name');
            $table->string('position_code',3);
            $table->decimal('x_coordinate');
            $table->decimal('y_coordinate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payerposition');
    }
};
