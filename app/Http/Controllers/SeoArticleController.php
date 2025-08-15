<?php

namespace App\Http\Controllers;

use App\Services\ArticleService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SeoArticleController extends Controller
{
    protected $articleService;

    /**
     * @param $articleService
     */
    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    public function getArticleBySlug($slug){
        $article=$this->articleService->getArticleBySlug($slug);
        if(!$article) abort('404');
        $title=$article->categorie->categorie.' Actualité :: '. $this->appendCountryIfFound($article->titre,$article->pays->pays);
        return view('seo.article',[
            'description'=>$article->chapeau,
            'keywords'=>$article->motclef,
            'title'=>$title,
            'image'=>$article->images->url,
            'width'=>$article->images->width,
            'height'=>$article->images->height,
            'date'=>$article->date_parution,

        ]);
    }
    private function appendCountryIfFound($title, $country): string {
        if(Str::lower($title).contains(Str::lower($country))){
            return `{{$country}} {{$title}}`;
        }
        return $title;
  }

}
