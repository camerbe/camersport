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
        Schema::create('livematchs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('matchsheetid')->constrained()->onDelete('cascade');
            $table->string('team_name');
            //$table->json('player')->nullable();// { "name": "Jean Toko", "number": 9, "position": "ST" }
            $table->enum('type', [
                'But', 'But sur penalty', 'Contre son camp', 'Remplacement',
                'Carton jaune', 'Carton rouge', "Coup d'envoi", 'Mi-temps',
                'Seconde mi-temps', 'Fin du match', 'Commentaire', 'Blessure',
                'Vérification VAR', 'Penalty manqué', 'Prolongations', 'Séance de tirs au but'
            ]);
            // Description de l’événement
            $table->string('description')->nullable();
            // Minute ou horodatage de l’événement
            $table->string('event_minute'); // ex : "17", "90+2", "PEN-3"
            // Statut (permet d’annuler, modifier, confirmer un événement)
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('confirmed');
            $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livematchs');

    }
};
