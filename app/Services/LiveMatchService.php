<?php

namespace App\Services;

use App\Repositories\ILiveMatchRrepository;

class LiveMatchService
{

    public function __construct(protected ILiveMatchRrepository $liveMatchRrepository)
    {
    }
    public function create(array $data){
        return $this->liveMatchRrepository->create($data);
    }
    public function update(array $data,int $id){
        return $this->liveMatchRrepository->update($id,$data);
    }
    public function delete(int $id){
        return $this->liveMatchRrepository->delete($id);
    }
    public function find(int $id){
        return $this->liveMatchRrepository->find($id);
    }
    public function all(){
        return $this->liveMatchRrepository->all(['created_at'=>'desc']);
    }
    public function getLiveMatch(int $matchSheet_id){
        return $this->liveMatchRrepository->getLiveMatch($matchSheet_id);
    }
}
