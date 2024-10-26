<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
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
    Route::get('articles/slug/{articles}', [ArticleController::class, 'getArticleBySlug']);
    Route::get('articles/user/{articles}', [ArticleController::class, 'getArticleByUserId']);
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/changepassword', [AuthController::class, 'changePassword']);
    Route::group(['middleware' => 'auth:sanctum'], function (){
        Route::apiResources([
            "users"=>UserController::class,
            "countries"=>PaysController::class,
            "categories"=>CategorieController::class,
            "competitions"=>CompetitionController::class,
            "lives"=>LiveMatchController::class,
            "articles"=>ArticleController::class,

        ]);
    } );

