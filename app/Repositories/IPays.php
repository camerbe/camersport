<?php

namespace App\Repositories;

interface IPays
{
    function findByCode(string $code);
}
