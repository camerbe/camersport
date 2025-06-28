<?php

namespace App\Console\Commands;

use App\Http\Resources\ArticleResource;
use App\Services\ArticleService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\News;
use Spatie\Sitemap\Tags\Image;
use Spatie\Sitemap\SitemapGenerator;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.xml file.';
    protected $articleService;
    public function __construct(ArticleService $articleService)
    {
        parent::__construct();
        $this->articleService=$articleService;
    }


    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $this->info('Generating sitemap...');
        $sitemap = Sitemap::create();
        $sitemapCamer = Sitemap::create();
        $sitemapInternational = Sitemap::create();
        $sitemaplions = Sitemap::create();
        $sitemapGoogleNews = Sitemap::create();



        $items= ArticleResource::collection($this->articleService->publicIndex()->take(30));
        $itemCamers=ArticleResource::collection($this->articleService->publicIndex())->filter(function ($el){
            return $el->pays_code==='CMR';
        })->take(30);
        $itemInters=ArticleResource::collection($this->articleService->publicIndex())->filter(function ($el){
            return $el->pays_code!='CMR';
        })->take(30);
        $itemLions=ArticleResource::collection($this->articleService->publicIndex())->filter(function ($el){
            return $el->categorie->slugcategorie ==='lions-indomptables';
        })->take(30);

        $google_news=ArticleResource::collection($this->articleService->publicIndex())->filter(function($el){
            return $el->date_parution <= now();
        })->take(50);
        //dd($itemLions);
        foreach ($items as $item){
            $media=$item->getFirstMedia('article');
            $image=\App\Helpers\ImageHelper::extractImgSrc($item->image);
            $titre=\App\Helpers\ImageHelper::appendCountryIfFound($item->titre,$item->bled->pays);


            $articleUrl=Url::create("/article/{$item->slug}")
                ->setLastModificationDate($item->updated_at)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                ->setPriority(0.8);
            $articleUrl->addImage($image);

            //$sitemap = ;
            $sitemap->add($articleUrl);

        }

        foreach ($itemCamers as $item){
            $media=$item->getFirstMedia('article');
            $image=\App\Helpers\ImageHelper::extractImgSrc($item->image);
            $titre=\App\Helpers\ImageHelper::appendCountryIfFound($item->titre,$item->bled->pays);


            $articleUrl=Url::create("/article/{$item->slug}")
                ->setLastModificationDate($item->updated_at)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                ->setPriority(0.8);
            $articleUrl->addImage($image);

            //$sitemap = ;
            $sitemapCamer->add($articleUrl);

        }
        foreach ($itemInters as $item){
            $media=$item->getFirstMedia('article');
            $image=\App\Helpers\ImageHelper::extractImgSrc($item->image);
            $titre=\App\Helpers\ImageHelper::appendCountryIfFound($item->titre,$item->bled->pays);


            $articleUrl=Url::create("/article/{$item->slug}")
                ->setLastModificationDate($item->updated_at)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                ->setPriority(0.8);
            $articleUrl->addImage($image);

            //$sitemap = ;
            $sitemapInternational->add($articleUrl);

        }
        foreach ($itemLions as $item){
            $media=$item->getMedia('article')->where('name',$item->slug)->first();;
            //dd($media->original_url);
            $image=\App\Helpers\ImageHelper::extractImgSrc($item->image);
            $titre=\App\Helpers\ImageHelper::appendCountryIfFound($item->titre,$item->bled->pays);


            $articleUrl=Url::create("/article/{$item->slug}")
                ->setLastModificationDate($item->updated_at)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                ->setPriority(0.8);
            $articleUrl->addImage($image);

            //$sitemap = ;
            $sitemaplions->add($articleUrl);

        }
        $this->info('Generating Google News sitemap...');
        foreach ($google_news as $item){
            $media=$item->getFirstMedia('article');
            $image=\App\Helpers\ImageHelper::extractImgSrc($item->image);
            $titre=\App\Helpers\ImageHelper::appendCountryIfFound($item->titre,$item->bled->pays);
            /*$newsTag=new News(
                config('app.name'),
                config('app.locale', 'fr'),
                $titre,
                new Carbon($item->date_parution)
            );*/

            //$newsTag->setKeywords($item->motclef); // 'actualité, sport, football'
            //$newsTag->setGenres('Blog, Sports');
            $articleUrl=Url::create(config('app.url')."/article/{$item->slug}")
                ->setLastModificationDate(new Carbon($item->updated_at));
            $articleUrl->addNews(
                config('app.name'),
                config('app.locale', 'fr'),
                $titre,
                new Carbon($item->date_parution)
            );
            $articleUrl->addImage(url($media->original_url),$titre,'',$item->titre);
            $sitemapGoogleNews->add($articleUrl);
        }


        $sitemap->writeToFile(public_path('sitemap.xml'));
        $sitemapCamer->writeToFile(public_path('sitemap-camer.xml'));
        $sitemapInternational->writeToFile(public_path('sitemap-international.xml'));
        $sitemaplions->writeToFile(public_path('sitemap-lions.xml'));
        $sitemapGoogleNews->writeToFile(public_path('sitemap-actualites.xml'));
        $this->info('Sitemap generated successfully at public/sitemap.xml!');
    }
}
