<?php

use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\CompetitionController;
use App\Http\Controllers\Api\LiveMatchController;
use App\Http\Controllers\Api\PaysController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

    /*Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');*/

    Route::apiResources([
        "users"=>UserController::class,
        "countries"=>PaysController::class,
        "categories"=>CategorieController::class,
        "competitions"=>CompetitionController::class,
        "lives"=>LiveMatchController::class,
    ]);
