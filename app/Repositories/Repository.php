<?php

namespace App\Repositories;

class Repository implements IRepository
{
    protected $model;

    /**
     * @param $model
     */
    public function __construct($model)
    {
        $this->model = $model;
    }


    public function all($orderBy = ['created_at' => 'desc'])
    {
        $query = $this->model->query();

        foreach ($orderBy as $column => $direction) {
            if (!is_string($column)) {
                continue;
            }
            $direction = strtolower($direction);
            if (!in_array($direction, ['asc', 'desc'])) {
                $direction = 'desc';
            }
            $query->orderBy($column, $direction);
        }
        return $query->get();
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $model = $this->model->findOrFail($id);
        $model->update($data);
        return $model;
    }

    public function delete($id)
    {
        $model = $this->model->findOrFail($id);
        return $model->delete();
    }
}
