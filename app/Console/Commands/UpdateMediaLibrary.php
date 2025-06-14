<?php

namespace App\Console\Commands;

use App\Helpers\ImageHelper;
use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Intervention\Image\Laravel\Facades\Image;

class UpdateMediaLibrary extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'updateMedia:cron';

    protected $articleService;
    public function __construct(ArticleService $articleService)
    {
        parent::__construct();
        $this->articleService=$articleService;
    }
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updating Articles Media...';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $this->info('Updating Articles Media...');
        $articles=Article::all();

        foreach ($articles as $article){
            $image=ImageHelper::extractImgSrc($article->image);
            /** @var TYPE_NAME $media */
            $media =$article->getMedia('article')->where('name',$article->slug)->first();
            if(!is_null($media))
            {
                $media->delete();
            }

                //dd($media);
                //$this->info('{{}}');
                //var_dump($media->custom_properties);
                $parsedUrl = parse_url($image);
                $path = $parsedUrl['path'];
                $filePath = str_replace(url('/storage'), 'storage', $path);
                $absolutePath = public_path($filePath);
                if (File::exists($absolutePath) && exif_imagetype($absolutePath)) {
                    try {
                        $img = Image::read($absolutePath);
                        $article->addMedia(public_path($filePath))
                            ->preservingOriginal()
                            ->withResponsiveImages()
                            ->usingName($article->slug)
                            ->withCustomProperties([
                                'width' => $img->width(),
                                'height' => $img->height(),
                            ])
                            ->toMediaCollection('article');
                    } catch (\Throwable $e) {
                        Log::error("Erreur traitement image : " . $e->getMessage());
                    }
                }
            //}



        }
        $this->info('Update done successfully');
    }
}
