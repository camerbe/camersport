<?php

namespace App\Repositories;

interface ILiveMatchRrepository
{
    function getLiveMatch(int $match_id);
    function getLastMatchSheet();
    function getTeams();
}
