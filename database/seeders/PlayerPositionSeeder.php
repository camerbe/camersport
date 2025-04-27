<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlayerPositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('playerpositions')->insertGetId([
            'position_name'=>'Gardien',
            'position_code'=>'GK',
            'x_coordinate'=>'5',
            'y_coordinate'=>'50',
        ]);
        DB::table('playerpositions')->insertGetId([
            'position_name'=>'Défenseur droit',
            'position_code'=>'RB',
            'x_coordinate'=>'20',
            'y_coordinate'=>'85',
        ]);
        DB::table('playerpositions')->insertGetId([
            'position_name'=>'Défenseur central droit',
            'position_code'=>'RCB',
            'x_coordinate'=>'20',
            'y_coordinate'=>'65',
        ]);
        DB::table('playerpositions')->insertGetId([
            'position_name'=>'Défenseur central gauche',
            'position_code'=>'LCB',
            'x_coordinate'=>'20',
            'y_coordinate'=>'35',
        ]);
        DB::table('playerpositions')->insertGetId([
            'position_name'=>'Défenseur gauche',
            'position_code'=>'LB',
            'x_coordinate'=>'20',
            'y_coordinate'=>'15',
        ]);
        DB::table('playerpositions')->insertGetId([
            'position_name'=>'Milieu défensif',
            'position_code'=>'CDM',
            'x_coordinate'=>'35',
            'y_coordinate'=>'50',
        ]);
        DB::table('playerpositions')->insertGetId([
            'position_name'=>'Milieu droit',
            'position_code'=>'RM',
            'x_coordinate'=>'35',
            'y_coordinate'=>'75',
        ]);
        DB::table('playerpositions')->insertGetId([
            'position_name'=>'Milieu central',
            'position_code'=>'CM',
            'x_coordinate'=>'35',
            'y_coordinate'=>'50',
        ]);
        DB::table('playerpositions')->insertGetId([
            'position_name'=>'Milieu gauche',
            'position_code'=>'LM',
            'x_coordinate'=>'35',
            'y_coordinate'=>'25',
        ]);
        DB::table('playerpositions')->insertGetId([
            'position_name'=>'Attaquant droit',
            'position_code'=>'RW',
            'x_coordinate'=>'65',
            'y_coordinate'=>'80',
        ]);
        DB::table('playerpositions')->insertGetId([
            'position_name'=>'Attaquant gauche',
            'position_code'=>'LW',
            'x_coordinate'=>'65',
            'y_coordinate'=>'20',
        ]);
        DB::table('playerpositions')->insertGetId([
            'position_name'=>'Avant-centre',
            'position_code'=>'ST',
            'x_coordinate'=>'70',
            'y_coordinate'=>'50',
        ]);
    }
}
