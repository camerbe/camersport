<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestLiveMatch;
use App\Repositories\LiveMatchRepository;
use App\Services\LiveMatchService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LiveMatchController extends Controller
{
    protected $livematchService;

    /**
     * @param $livematchRepository
     */
    public function __construct(LiveMatchService $livematchService)
    {
        $this->livematchService = $livematchService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $livematchs=$this->livematchService->all();
        if ($livematchs){
            return response()->json([
                'success'=>true,
                'data'=>$livematchs,
                'message'=>"Liste des Live"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de live trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $livematch=$this->livematchService->create($request->all());

        if ($livematch){
            return response()->json([
                'success'=>true,
                'data'=>$livematch,
                'message'=>"Live inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un live"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $livematch=$this->livematchService->find($id);
        //dd($livematch);
        if($livematch){
            return response()->json([
                "success"=>true,
                "data"=>$livematch,
                "message"=>"Live trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Live inexistant"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //

        $livematch=$this->livematchService->update($request->all(),$id);

        if ($livematch){
            return response()->json([
                'success'=>true,
                'data'=>$livematch,
                'message'=>"Live mise à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un live"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $livematch=$this->livematchService->delete($id);
        if($livematch>0){
            return response()->json([
                "success"=>true,
                "message"=>"Suppression réussie"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Une erreur s'est produite..."
        ],Response::HTTP_NOT_FOUND);
    }
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLiveMatch($matchSheet_id)
    {

        $livematch=$this->livematchService->getLiveMatch($matchSheet_id);
        if($livematch){
            return response()->json([
                "success"=>true,
                'data'=>$livematch,
                "message"=>"LiveMatch trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Une erreur s'est produite..."
        ],Response::HTTP_NOT_FOUND);
    }
    public function getTeams(){
        $teams=$this->livematchService->getTeams();
        if($teams){
            return response()->json([
                "success"=>true,
                'data'=>$teams,
                "message"=>"Team trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Une erreur s'est produite..."
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastMatchSheet(){
        $matchSheet=$this->livematchService->getLastMatchSheet();
        if($matchSheet){
            return response()->json([
                "success"=>true,
                'data'=>$matchSheet,
                "message"=>"MatchSheet trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Une erreur s'est produite..."
        ],Response::HTTP_NOT_FOUND);
    }

}
