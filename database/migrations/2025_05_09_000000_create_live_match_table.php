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
            $table->foreignId('matchsheet_id')->constrained()->onDelete('cascade');
            $table->foreignId('team_id')->constrained('teams')->onDelete('cascade');
            $table->json('player')->nullable();// { "name": "Jean Toko", "number": 9, "position": "ST" }
            $table->enum('event_type', [
                'But',
                'But_sur_penalty',
                'Contre_son_camp',
                'Remplacement',
                'Carton_jaune',
                'Carton_rouge',
                'Coup_d_envoi',
                'Mi_temps',
                'Seconde_mi_temps',
                'Fin_du_match',
                'Commentaire',
                'Blessure',
                'Verification_VAR',
                'Penalty_manque',
                'Prolongations',
                'Seance_tirs_au_but',
                'Annonce_temps_additionnel',
                'Hors_jeu',
                'Passe_decisive',
                'Arret_du_gardien'
            ]);
            // Description de l’événement
            $table->text('description')->nullable();
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
