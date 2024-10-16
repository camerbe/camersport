<?php

namespace App\Repositories;

use App\Http\Resources\PaysResource;
use App\Models\Pays;
use Illuminate\Support\Str;

class PaysRepository extends BaseRepository
{

    public function __construct(Pays $bled)
    {
        $this->model=$bled;
    }

    public function findById($id)
    {
        return new PaysResource(parent::findById($id)) ;
    }

    public function delete($id)
    {
        return parent::delete($id);
    }

    public function update(array $input, $id)
    {
        $currentPays=parent::findById($id);
        $input['pays']=isset($input['pays'])? Str::upper($input['pays']):$currentPays->pays;
        $input['country']=isset($input['country'])? Str::upper($input['country']):$currentPays->country;
        $input['code']= Str::upper($input['code']) ?? $currentPays->code;
        $input['code3 ']= Str::upper($input['code3 '] )?? $currentPays->code3;
        return parent::update($input, $id);
    }

    public function create(array $input)
    {
        $input['pays']=Str::upper($input['pays']);
        $input['country']=Str::upper($input['country']);
        $input['code']=Str::upper($input['code']);
        $input['code3']=Str::upper($input['code3']);
        return new PaysResource(parent::create($input));
    }

    public function findAll(){
       return PaysResource::collection(
           Pays::orderBy('pays')
                 ->get()

       );
    }


}
