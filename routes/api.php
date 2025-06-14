<?php

use App\Http\Controllers\Api\MatchSheetController;
use App\Http\Controllers\Api\PasswordController;
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
    Route::get('matchs/last', [MatchSheetController::class, 'getLastMatchSheet']);
    Route::get('lives/{id}/matchsheets', [LiveMatchController::class, 'getLiveMatch']);
    Route::patch('register/{register}', [UserController::class, 'changePassword']);
    Route::post('password/forgot', [PasswordController::class, 'forgot']);
    Route::post('password/reset', [PasswordController::class, 'reset']);

    Route::get('articles/public', [ArticleController::class, 'publicIndex']);

    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/changepassword', [AuthController::class, 'changePassword']);
    Route::group(['middleware' => 'auth:api'], function (){
        Route::get('articles/categories', [ArticleController::class, 'getCategories']);
        Route::get('articles/competitions', [ArticleController::class, 'getCompetitions']);
        Route::get('articles/pays', [ArticleController::class, 'getCountries']);
        Route::get('articles/user/{articles}', [ArticleController::class, 'getArticleByUserId']);
        Route::post('auth/logout', [AuthController::class, 'logout']);

        Route::get('matchs/teams', [MatchSheetController::class, 'getTeams']);

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

    Route::get('/email/verify/{id}/{hash}', function (Request $request) {
        if (! URL::hasValidSignature($request)) {
            abort(403, 'Lien expiré ou signature invalide.');
        }
        $user=\App\Models\User::find($request->id);
        if($user && is_null($user->email_verified_at)){
            $user->email_verified_at=now();
            $user->save();
            return redirect()->away(env('FRONTEND_URL')."/register/{$request->id}");

        }
        return redirect()->away(env('FRONTEND_URL'));;
    })->middleware(['web', 'signed'])->name('verification.verify');

    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return back()->with('message', 'Verification link sent!');
    })->middleware(['auth', 'throttle:6,1'])->name('verification.send');
