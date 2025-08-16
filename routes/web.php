<?php

use App\Helpers\ImageHelper;
use App\Http\Controllers\RssController;
use App\Http\Controllers\SitemapController;
use App\Models\Article;
//use Illuminate\Http\File;
use Illuminate\Http\Request ;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Carbon\Carbon;
use Illuminate\Support\Str;
use UniSharp\LaravelFilemanager\Lfm;
use GuzzleHttp\Client;
//use Illuminate\Support\Facades\Request;

Route::get('/', function () {
    return view('welcome');
});
/*Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web', 'auth']], function () {
    Lfm::routes();
});*/

Route::prefix('rss')->group(function () {
    Route::get('/', [RssController::class, 'feed'])->name('rss.main');
    Route::get('/google-news', [RssController::class, 'googleNews'])->name('rss.googleNews');
    Route::get('/actualite', [RssController::class, 'sitemapActualite'])->name('rss.actualite');
    Route::get('/lion', [RssController::class, 'sitemapLion'])->name('rss.lion');
    Route::get('/camer', [RssController::class, 'sitemapCamer'])->name('rss.camer');
    Route::get('/international', [RssController::class, 'sitemapInternational'])->name('rss.international');
    /*Route::get('/livematch', [RssController::class, 'livematchFeed'])->name('rss.livematch');
    Route::get('/category/{category}', [RssController::class, 'categoryFeed'])->name('rss.category');*/
});
Route::get('/sitemapindex.xml', [SitemapController::class, 'index'])->name('sitemap.index');
Route::get('/sitemap-google-news.xml', [SitemapController::class, 'googleNews'])->name('sitemap.google-news');
Route::get('/sitemap-actualite.xml', [SitemapController::class, 'actualite'])->name('sitemap.actualite');
Route::get('/sitemap-camer.xml', [SitemapController::class, 'camer'])->name('sitemap.camer');
Route::get('/sitemap-lion.xml', [SitemapController::class, 'lion'])->name('sitemap.lion');
Route::get('/sitemap-international.xml', [SitemapController::class, 'international'])->name('sitemap.international');
