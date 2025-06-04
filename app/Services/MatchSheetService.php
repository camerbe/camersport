<?php

namespace App\Services;

use App\Repositories\IMatchSheetRepository;
use App\Repositories\IRepository;

class MatchSheetService
{

    public function __construct(protected IMatchSheetRepository  $matchSheetRepository)
    {
    }

    public function create(array $data){
        return $this->matchSheetRepository->create($data);
    }
    public function update(array $data,int $id){
        return $this->matchSheetRepository->update($id,$data);
    }
    public function delete(int $id){
        return $this->matchSheetRepository->delete($id);
    }
    public function find(int $id){
        return $this->matchSheetRepository->find($id);
    }
    public function all(){
        return $this->matchSheetRepository->all(['created_at'=>'desc']);
    }
    public function getTeams(){
        return $this->matchSheetRepository->getTeams();
    }
    public function getLastMatchSheet()
    {
        return $this->matchSheetRepository->getLast();
    }
}
