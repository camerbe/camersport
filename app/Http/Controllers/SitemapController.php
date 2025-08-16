<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Helpers\ImageHelper;
use App\Http\Resources\ArticleResource;
use App\Services\ArticleService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\SitemapIndex;
use Spatie\Sitemap\Tags\Sitemap as SitemapTag;
use Spatie\Sitemap\Tags\Url;

class SitemapController extends Controller
{
    protected $articleService;

    /**
     * @param $articleService
     */
    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }
    public function index(){
        $sitemapIndex = SitemapIndex::create();
        $sitemapIndex->add(SitemapTag::create(route('rss.main')))
            ->add(SitemapTag::create(route('rss.actualite')))
            ->add(SitemapTag::create(route('rss.camer')))
            ->add(SitemapTag::create(route('rss.international')))
            ->add(SitemapTag::create(route('rss.lion')));
        $sitemapIndex->add(SitemapTag::create(route('sitemap.google-news')));
        $sitemapIndex->add(SitemapTag::create(route('sitemap.actualite')));
        $sitemapIndex->add(SitemapTag::create(route('sitemap.camer')));
        $sitemapIndex->add(SitemapTag::create(route('sitemap.lion')));
        $sitemapIndex->add(SitemapTag::create(route('sitemap.international')));
        return response($sitemapIndex->render(), 200, ['Content-Type' => 'application/xml']);
    }
    public function googleNews(){
        $articles=ArticleResource::collection($this->articleService->publicIndex()->take(50));
        $sitemap = Sitemap::create('');
        foreach ($articles as $article){
            $media=$article->getFirstMedia('article');
            $titre=ImageHelper::appendCountryIfFound($article->titre,$article->bled->pays);
            $url= new Url("/{$article->slug}");
            $url->setChangeFrequency(Url::CHANGE_FREQUENCY_HOURLY)
                ->setPriority(0.9);
            $url->addNews(
                name: 'Camer-sport.com',
                language: 'fr',
                title: $titre,
                publicationDate:Carbon::parse($article->dateparution),
                options: [
                    'keywords'=>$article->keyword,

                ],


            );
            if($media){
                $image=ImageHelper::extractImgSrc($article->image);
                $image=ImageHelper::parseImageUrl($image);
                $url->addImage($image,$article->titre,$article->bled->pays,$titre);
            }
            $sitemap->add($url);
        }
        return response($sitemap->render(), 200, ['Content-Type' => 'application/xml']);
    }
    public function actualite(){
        $articles=ArticleResource::collection(
            $this->articleService->publicIndex()
            ->take(100));
        $sitemap = Sitemap::create('');
        foreach ($articles as $article){
            $media=$article->getFirstMedia('article');
            $titre=ImageHelper::appendCountryIfFound($article->titre,$article->bled->pays);
            $url= new Url("/{$article->slug}");
            $url->setLastModificationDate(Carbon::parse($article->dateparution))
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                ->setPriority(0.8);
            if($media){
                $image=ImageHelper::extractImgSrc($article->image);
                $image=ImageHelper::parseImageUrl($image);
                $url->addImage($image,$article->titre,$article->bled->pays,$titre);
            }
            $sitemap->add($url);
        }
        return response($sitemap->render(), 200, ['Content-Type' => 'application/xml']);
    }
    public function camer(){
        $articles=ArticleResource::collection(
            $this->articleService->publicIndex()
                ->where('pays_code','CMR')
                ->take(50));
        $sitemap = Sitemap::create('');
        foreach ($articles as $article){
            $media=$article->getFirstMedia('article');
            $titre=ImageHelper::appendCountryIfFound($article->titre,$article->bled->pays);
            $url= new Url("/{$article->slug}");
            $url->setLastModificationDate(Carbon::parse($article->dateparution))
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                ->setPriority(0.8);
            if($media){
                $image=ImageHelper::extractImgSrc($article->image);
                $image=ImageHelper::parseImageUrl($image);
                $url->addImage($image,$article->titre,$article->bled->pays,$titre);
            }
            $sitemap->add($url);
        }
        return response($sitemap->render(), 200, ['Content-Type' => 'application/xml']);
    }
    public function lion(){
        $articles=ArticleResource::collection(
            $this->articleService->publicIndex()
                ->where('categorie.categorie','Lions Indomptables')
                ->take(50));
        $sitemap = Sitemap::create('');
        foreach ($articles as $article){
            $media=$article->getFirstMedia('article');
            $titre=ImageHelper::appendCountryIfFound($article->titre,$article->bled->pays);
            $url= new Url("/{$article->slug}");
            $url->setLastModificationDate(Carbon::parse($article->dateparution))
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                ->setPriority(0.8);
            if($media){
                $image=ImageHelper::extractImgSrc($article->image);
                $image=ImageHelper::parseImageUrl($image);
                $url->addImage($image,$article->titre,$article->bled->pays,$titre);
            }
            $sitemap->add($url);
        }
        return response($sitemap->render(), 200, ['Content-Type' => 'application/xml']);
    }
    public function international(){
        $articles=ArticleResource::collection(
            $this->articleService->publicIndex()
                ->where('pays_code','<>','CMR')
                ->take(50));
        $sitemap = Sitemap::create('');
        foreach ($articles as $article){
            $media=$article->getFirstMedia('article');
            $titre=ImageHelper::appendCountryIfFound($article->titre,$article->bled->pays);
            $url= new Url("/{$article->slug}");
            $url->setLastModificationDate(Carbon::parse($article->dateparution))
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                ->setPriority(0.8);
            if($media){
                $image=ImageHelper::extractImgSrc($article->image);
                $image=ImageHelper::parseImageUrl($image);
                $url->addImage($image,$article->titre,$article->bled->pays,$titre);
            }
            $sitemap->add($url);
        }
        return response($sitemap->render(), 200, ['Content-Type' => 'application/xml']);
    }
}
