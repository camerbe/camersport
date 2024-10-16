<?php

namespace App\Repositories;

use App\Http\Resources\CategorieResource;
use App\Http\Resources\CompetitionResource;
use App\Http\Resources\PaysResource;
use App\Models\Categorie;
use App\Models\Competition;
use App\Models\Pays;
use Illuminate\Support\Str;

class CompetitionRepository extends BaseRepository
{

    public function __construct(Competition $competition)
    {
        $this->model=$competition;
    }

    public function findById($id)
    {
        return new CompetitionResource(parent::findById($id)) ;
    }

    public function delete($id)
    {
        return parent::delete($id);
    }

    public function update(array $input, $id)
    {
        $currentCompetition=parent::findById($id);
        $input['competition']=isset($input['competition'])? Str::title($input['competition']):$currentCompetition->competition;
        $input['slugcompetition']=Str::slug($input['competition']);
        return parent::update($input, $id);
    }

    public function create(array $input)
    {
        $input['competition']=Str::title($input['competition']);
        $input['slugcompetition']=Str::slug($input['competition']);
        return new CompetitionResource(parent::create($input));
    }

    public function findAll(){
       return CompetitionResource::collection(
           Competition::orderBy('competition')
                 ->get()

       );
    }
    public function findWithPagination(){
        return CompetitionResource::collection(
            Competition::orderBy('competition')
                ->paginate()

        );
    }


}
