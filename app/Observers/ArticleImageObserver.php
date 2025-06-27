<?php

namespace App\Observers;

use App\Models\Article;

class ArticleImageObserver
{
    /**
     * Handle the Article "created" event.
     */
    public function created(Article $article): void
    {
        //
        if($article->image){
            $relativePath = $article->image;
            $sourcePath = storage_path('app/public/' . $relativePath);
            $destinationPath = base_path('public_html/api/storage/' . $relativePath);
            dd($relativePath);
            if (file_exists($sourcePath)) {
                if (!is_dir(dirname($destinationPath))) {
                    mkdir(dirname($destinationPath), 0755, true);
                }

                copy($sourcePath, $destinationPath);
            }
        }
    }

    /**
     * Handle the Article "updated" event.
     */
    public function updated(Article $article): void
    {
        //
    }

    /**
     * Handle the Article "deleted" event.
     */
    public function deleted(Article $article): void
    {
        //
    }

    /**
     * Handle the Article "restored" event.
     */
    public function restored(Article $article): void
    {
        //
    }

    /**
     * Handle the Article "force deleted" event.
     */
    public function forceDeleted(Article $article): void
    {
        //
    }
}
