<?php

use App\Http\Controllers\Api\MatchSheetController;
use App\Http\Controllers\Api\RssController;
use App\Http\Controllers\Api\TeamController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
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

    Route::get('articles/slug/{article}', [ArticleController::class, 'getArticleBySlug']);
    Route::get('articles/categorie/competition/{article}', [ArticleController::class, 'getArticleByCompetition']);
    Route::get('articles/categorie/{article}/mustreaded', [ArticleController::class, 'getCategorieMustReadedArticle']);
    Route::get('articles/competition/{article}/mustreaded', [ArticleController::class, 'getCompetitionMustReadedArticle']);



Route::get('articles/public', [ArticleController::class, 'publicIndex']);

    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/changepassword', [AuthController::class, 'changePassword']);
    Route::group(['middleware' => 'auth:api'], function (){
        Route::get('articles/categories', [ArticleController::class, 'getCategories']);
        Route::get('articles/competitions', [ArticleController::class, 'getCompetitions']);
        Route::get('articles/pays', [ArticleController::class, 'getCountries']);
        Route::get('articles/user/{articles}', [ArticleController::class, 'getArticleByUserId']);
        Route::post('auth/logout', [AuthController::class, 'logout']);
        Route::get('matchs/last', [MatchSheetController::class, 'getLastMatchSheet']);
        Route::get('matchs/teams', [MatchSheetController::class, 'getTeams']);
        Route::get('lives/{id}/matchsheets', [LiveMatchController::class, 'getLiveMatch']);
        Route::get('lives/teams', [LiveMatchController::class, 'getTeams']);
        Route::get('lives/matchsheets/last', [LiveMatchController::class, 'getLastMatchSheet']);
        Route::apiResources([
            "users"=>UserController::class,
            "countries"=>PaysController::class,
            "categories"=>CategorieController::class,
            "competitions"=>CompetitionController::class,
            "lives"=>LiveMatchController::class,
            "articles"=>ArticleController::class,
            "matchs"=>MatchSheetController::class,
            "teams"=>TeamController::class,


        ]);



    } );
    Route::get('/email/verify', function () {
        return view('auth.verify-email');
    })->middleware('auth')->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();

        return redirect('/home');
    })->middleware(['auth', 'signed'])->name('verification.verify');



    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();

        return back()->with('message', 'Verification link sent!');
    })->middleware(['auth', 'throttle:6,1'])->name('verification.send');
