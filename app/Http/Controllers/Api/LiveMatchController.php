<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestLiveMatch;
use App\Repositories\LiveMatchRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LiveMatchController extends Controller
{
    protected $livematchRepository;

    /**
     * @param $livematchRepository
     */
    public function __construct(LiveMatchRepository $livematchRepository)
    {
        $this->livematchRepository = $livematchRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $livematchs=$this->livematchRepository->findAll();
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
    public function store(RequestLiveMatch $request)
    {
        //
        $livematch=$this->livematchRepository->create($request->all());

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
    public function show(string $id)
    {
        //
        $livematch=$this->livematchRepository->findById($id);
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

        $livematch=$this->livematchRepository->update($request->all(),$id);

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
        $livematch=$this->livematchRepository->delete($id);
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


}
