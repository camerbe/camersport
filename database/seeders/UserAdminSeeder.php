<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('users')->insertGetId([
            'nom'=>'BOUNECK',
            'prenom'=>'Jean Pierre',
            'email'=>'webmaster@camer.be',
            'email_verified_at'=>now(),
            'password_changed_at'=>now(),
            'password'=> bcrypt('123456'),
            'role'=> 'Admin'

        ]);
    }
}
