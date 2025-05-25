<?php

namespace App\Services;

use App\Repositories\IArticleRepository;

class ArticleService
{

    public function __construct(protected IArticleRepository $articleRepository)
    {
    }
    public function all(){
        return $this->articleRepository->all(['date_parution'=>'desc']);
    }
    public function create(array $data){
        return $this->articleRepository->create($data);
    }
    public function update(array $data,int $id){
        return $this->articleRepository->update($id,$data);
    }
    public function delete(int $id){
        return $this->articleRepository->delete($id);
    }
    public function find(int $id){
        return $this->articleRepository->find($id);
    }
    public function getPays(){
        return $this->articleRepository->getPays();
    }

    public function getCategories()
    {
        return $this->articleRepository->getCategories();
    }
    public function getCompetitions()
    {
        return $this->articleRepository->getCompetitions();
    }
    public function getScheduledArticle()
    {
        return $this->articleRepository->getScheduledArticle();
    }
    public function getArticleByUserId(int $userId)
    {
        return $this->articleRepository->getArticleByUserId($userId);
    }
    public function getArticleBySlug(string $slug)
    {
        return $this->articleRepository->getArticleBySlug($slug);
    }
    public function publicIndex()
    {
        return $this->articleRepository->publicIndex();
    }
    public function getArticleByCompetition(int $competitionId){
        return $this->articleRepository->getArticleByCompetition($competitionId);
    }
    public function categorieMustReaded(int $categorieId){
        return $this->articleRepository->categorieMustReaded($categorieId);
    }
    public function competitionMustReaded(int $competitionId){
        return $this->articleRepository->competitionMustReaded($competitionId);
    }
}
