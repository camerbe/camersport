<?php

namespace App\Repositories;

interface IArticleRepository
{
    function getCategories();
    function getCompetitions();
    function getScheduledArticle();
    function getPays();
    function getArticleBySlug(string $slug);
    function publicIndex();
    function getArticleByUserId(int $userId);
    function getArticleByCompetition(int $competitionId);
}
