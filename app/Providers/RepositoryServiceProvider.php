<?php

namespace App\Providers;

use App\Repositories\BaseRepository;
use App\Repositories\CategorieRepository;
use App\Repositories\CompetitionRepository;
use App\Repositories\IRepository;
use App\Repositories\LiveMatchRepository;
use App\Repositories\MatchSheetRepository;
use App\Repositories\PaysRepository;
use App\Repositories\TeamRepository;
use App\Repositories\UserRepository;
use App\Services\MatchSheetService;
use App\Services\TeamService;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
        $this->app->bind(BaseRepository::class,UserRepository::class);
        $this->app->bind(BaseRepository::class,LiveMatchRepository::class);
        $this->app->bind(BaseRepository::class,CompetitionRepository::class);
        $this->app->bind(BaseRepository::class,CategorieRepository::class);
        $this->app->bind(BaseRepository::class,PaysRepository::class);

        $this->app->when(MatchSheetService::class)
            ->needs(IRepository::class)
            ->give(MatchSheetRepository::class);

        $this->app->when(TeamService::class)
            ->needs(IRepository::class)
            ->give(TeamRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
