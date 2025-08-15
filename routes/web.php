<?php

use App\Helpers\ImageHelper;
use App\Http\Controllers\RssController;
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
    //Route::get('/sitemap-image', [RssController::class, 'sitemapImage'])->name('rss.sitemapImage');
    /*Route::get('/livematch', [RssController::class, 'livematchFeed'])->name('rss.livematch');
    Route::get('/category/{category}', [RssController::class, 'categoryFeed'])->name('rss.category');*/
});
Route::get('{any}', function (Request $request, $any){
    //dd('Laravel reached for: ' . $any);
    $type='';
    if(Str::contains($any,'competitions/*')){
        $type = 'navigation';
    }
    elseif(Str::contains($any,'accueil')){
        $type = 'accueil';
    }
    else{
        $type = 'article';
    }

    if($any){

        $slug=$any;
        switch($type){
            case 'navigation':

            case 'accueil':
                $cacheKey = 'article-list';
                $articles=Cache::get($cacheKey , collect());
                $article=$articles->first();;
                break;
            case 'article' :
                $article= Article::with(['categorie','competition','bled'])
                    ->where('slug', $slug)->first();
                break;
        }

        //dd($type.' '.$article);
        if($article){
            $titre= $article->categorie->categorie.' Actualité - '
                . ImageHelper::appendCountryIfFound($article->titre,$article->bled->pays);
            //dd($titre);
            $description=$article->chapeau;
            $keywords=$article->motclef;
            $image=$article->images->first()['original'];
            $imageWidth=$article->images->first()['width'];
            $imageHeight=$article->images->first()['height'];
            $author=$article->auteur;
            $modifiedTime=Carbon::parse(now(), 'Europe/Paris');
            $publishedTime=Carbon::parse($article->date_parution, 'Europe/Paris');

            /*$indexPath = base_path('resources/frontend/camersportangular/src/index.html');
            if (!File::exists($indexPath)) {
                abort(404, 'Fichier index.html non trouvé');
            };
            //$indexPath = public_path('index.html');
            $html = File::get($indexPath);*/
            /*title*/
            $data=[
                'auteur'=>$author,
                'titre'=>$titre,
                'description'=>$description,
                'keywords'=>$keywords,
                'image'=>$image,
                'width'=>$imageWidth,
                'height'=>$imageHeight,
                'url'=>$request->fullUrl(),
                'modified_time'=>$modifiedTime->toIso8601String(),
                'published_time'=>$publishedTime->toIso8601String(),
                'canonical'=>$request->fullUrl(),
            ];
            /*$html = str_replace(
                '<title>Camer-sport.com::Le foot en temps et en heure</title>',
                '<title>' . e($titre) . '</title>'. "\n"
                .'<meta name="description" content="'. e($description).'" >'. "\n"
                .'<meta name="keywords" content="'. e($keywords).'" >'. "\n"
                .'<meta name="og:title" content="'. e($titre).'" >'. "\n"
                .'<meta name="og:description" content="'. e($description).'" >'. "\n"
                .'<meta name="og:image" content="'. e($image).'" >'. "\n"
                .'<meta name="og:image:alt" content="'. e($titre).'" >'. "\n"
                .'<meta name="og:image:width" content="'. e($imageWidth).'" >'. "\n"
                .'<meta name="og:image:height" content="'. e($imageHeight).'" >'. "\n"
                .'<meta name="og:url" content="'. e($request->fullUrl()).'" >'. "\n"
                .'<meta name="og:type" content="article">'. "\n"
                .'<meta name="og:locale" content="fr_FR">'. "\n"
                .'<meta name="og:locale:alternate" content="en">'. "\n"
                .'<meta name="og:site_name" content="Camer-sport.com">'. "\n"
                .'<meta name="twitter:title" content="'. e($titre).'" >'. "\n"
                .'<meta name="twitter:description" content="'. e($description).'" >'. "\n"
                .'<meta name="twitter:image" content="'. e($image).'" >'. "\n"
                .'<meta name="twitter:image:alt" content="'. e($titre).'" >'. "\n"
                .'<meta name="twitter:card" content="summary_large_image">'. "\n"
                .'<meta name="twitter:site" content="@camer.be">'. "\n"
                .'<meta name="twitter:creator" content="@camersport">'. "\n"
                .'<meta name="twitter:url" content="'. e($request->fullUrl()).'" >'. "\n"
                .'<meta name="robots" content="index, follow">'. "\n"
                .'<meta name="article:modified_time" content="'. e($modifiedTime->toIso8601String()).'" >'. "\n"
                .'<meta name="article:published_time" content="'. e($publishedTime->toIso8601String()).'" >'. "\n"
                .'<meta name="article:section" content="'. e($article->categorie->categorie).'" >'. "\n"
                .'<meta name="article:author" content="'. e($author).'" >'. "\n"
                .'<meta name="article:publisher" content="camer-sport.com">'. "\n"
                .'<link  rel="canonical" href="'.e($request->fullUrl()).'" >'. "\n",

                $html
            );*/
            //dd($html);
            //File::put($indexPath, $html);
            dd($data);
            return view('prerender.prerendered-angular-page', $data);
        }
        return view('prerender.prerendered-angular-page');
    }
});
