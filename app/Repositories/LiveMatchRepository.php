<?php

namespace App\Repositories;

use App\Http\Resources\LiveMatchResource;
use App\Models\Livematch;
use Illuminate\Support\Str;

class LiveMatchRepository extends BaseRepository
{

    public function __construct(Livematch $livematch)
    {
        $this->model=$livematch;
    }

    public function findById($id)
    {
        return new LiveMatchResource(parent::findById($id)) ;
    }

    public function delete($id)
    {
        return parent::delete($id);
    }

    public function update(array $input, $id)
    {
        $currentLiveMatch=parent::findById($id);
        $input['team1']=isset($input['team1'])? Str::title($input['team1']):$currentLiveMatch->team1;
        $input['team2']=isset($input['team2'])? Str::title($input['team2']):$currentLiveMatch->team2;
        $input['event_type']= $input['event_type'] ?? $currentLiveMatch->event_type;

        return parent::update($input, $id);
    }

    public function create(array $input)
    {
        $input['team1']=Str::title($input['team1']);
        $input['team2']=Str::title($input['team2']);

        return new LiveMatchResource(parent::create($input));
    }

    public function findAll(){
       return LiveMatchResource::collection(
           Livematch::orderBy('id','desc')
                 ->get()

       );
    }
    public function findWithPagination(){
        return LiveMatchResource::collection(
            Livematch::orderBy('id','desc')
                ->paginate()

        );
    }


}
