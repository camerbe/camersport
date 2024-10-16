<?php

namespace App\Repositories;

use App\Http\Resources\CategorieResource;
use App\Models\Categorie;
use Illuminate\Support\Str;

class CategorieRepository extends BaseRepository
{

    public function __construct(Categorie $categorie)
    {
        $this->model=$categorie;
    }

    public function findById($id)
    {
        return new CategorieResource(parent::findById($id)) ;
    }

    public function delete($id)
    {
        return parent::delete($id);
    }

    public function update(array $input, $id)
    {
        $currentCategorie=parent::findById($id);
        $input['categorie']=isset($input['categorie'])? Str::title($input['categorie']):$currentCategorie->categorie;
        $input['slugcategorie']=Str::slug($input['categorie']);
        return parent::update($input, $id);
    }

    public function create(array $input)
    {
        $input['categorie']=Str::title($input['categorie']);
        $input['slugcategorie']=Str::slug($input['categorie']);
        return new CategorieResource(parent::create($input));
    }

    public function findAll(){
       return CategorieResource::collection(
           Categorie::orderBy('categorie')
                 ->get()

       );
    }
    public function findWithPagination(){
        return CategorieResource::collection(
            Categorie::orderBy('categorie')
                ->paginate()

        );
    }


}
