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
use UniSharp\LaravelFilemanager\Lfm;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/
    Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web']], function () {
        Lfm::routes();
    });

    Route::get('articles/slug/{articles}', [ArticleController::class, 'getArticleBySlug']);
    Route::get('articles/user/{articles}', [ArticleController::class, 'getArticleByUserId']);
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/changepassword', [AuthController::class, 'changePassword']);
    Route::group(['middleware' => 'auth:api'], function (){
        Route::get('articles/categories', [ArticleController::class, 'getCategories']);
        Route::get('articles/competitions', [ArticleController::class, 'getCompetitions']);
        /*Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web']], function () {
            Lfm::routes();
        });*/
        Route::post('auth/logout', [AuthController::class, 'logout']);
        Route::apiResources([
            "users"=>UserController::class,
            "countries"=>PaysController::class,
            "categories"=>CategorieController::class,
            "competitions"=>CompetitionController::class,
            "lives"=>LiveMatchController::class,
            "articles"=>ArticleController::class,

        ]);



    } );

