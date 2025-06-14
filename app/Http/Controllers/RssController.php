<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleResource;
use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\View;

class RssController extends Controller
{
    protected $articleService;
    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }
    //
    public function feed(): Response
    {

        $items=ArticleResource::collection($this->articleService->publicIndex()->take(20));
        $rss = View::make('rss.feed', compact('items'));
        return response($rss, 200)->header('Content-Type', 'application/xml');
    }
    public function googleNews(){
        $items=ArticleResource::collection($this->articleService->publicIndex()->take(50));
        $rss = View::make('rss.feeds-google-news', compact('items'));
        return response($rss, 200)->header('Content-Type', 'application/xml');

    }
}
