<?php

use App\Http\Controllers\RssController;
use Illuminate\Support\Facades\Route;
use UniSharp\LaravelFilemanager\Lfm;

Route::get('/', function () {
    return view('welcome');
});
/*Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web', 'auth']], function () {
    Lfm::routes();
});*/

Route::prefix('rss')->group(function () {
    Route::get('/', [RssController::class, 'feed'])->name('rss.main');
    Route::get('/google-news', [RssController::class, 'googleNews'])->name('rss.googleNews');
    /*Route::get('/livematch', [RssController::class, 'livematchFeed'])->name('rss.livematch');
    Route::get('/category/{category}', [RssController::class, 'categoryFeed'])->name('rss.category');*/
});
