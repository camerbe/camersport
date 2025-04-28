<?php

namespace App\Services;

use App\Repositories\IRepository;

/**
 *
 */
class TeamService
{

    /**
     * @param IRepository $teamService
     */
    public function __construct(protected IRepository $teamService)
    {
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function create(array $data){
        return $this->teamService->create($data);
    }

    /**
     * @param array $data
     * @param int $id
     * @return mixed
     */
    public function update(array $data, int $id){
        return $this->teamService->update($id,$data);
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function delete(int $id){
        return $this->teamService->delete($id);
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function find(int $id){
        return $this->teamService->find($id);
    }

    /**
     * @return mixed
     */
    public function all(){
        return $this->teamService->all(['name'=>'asc']);
    }

}
