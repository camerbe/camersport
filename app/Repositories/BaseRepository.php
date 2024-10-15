<?php

namespace App\Repositories;

abstract class BaseRepository
{
    protected $model;

    public function findById($id){
        return $this->model->findOrFail($id);
    }
    public function delete($id){
        return $this->model->findOrFail($id)->delete();
    }
    public function update(Array $input,$id){

        return $this->model->findOrFail($id)->update($input);
    }
    public function create(Array $input){
        return $this->model->create($input);
    }
}
