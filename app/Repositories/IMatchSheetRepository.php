<?php

namespace App\Repositories;

interface IMatchSheetRepository extends IRepository
{
    public function getTeams();
    public function getLast();
}
