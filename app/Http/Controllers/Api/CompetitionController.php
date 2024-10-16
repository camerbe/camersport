<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestCompetition;
use App\Repositories\CompetitionRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CompetitionController extends Controller
{
    protected $competitionRepository;

    /**
     * @param $competitionRepository
     */
    public function __construct(CompetitionRepository $competitionRepository)
    {
        $this->competitionRepository = $competitionRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $competitions=$this->competitionRepository->findAll();
        if ($competitions){
            return response()->json([
                'success'=>true,
                'data'=>$competitions,
                'message'=>"Liste des Competitions"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de compétition trouvée"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestCompetition $request)
    {
        //
        $competition=$this->competitionRepository->create($request->all());

        if ($competition){
            return response()->json([
                'success'=>true,
                'data'=>$competition,
                'message'=>"Catégorie insérée",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'une compétition"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $competition=$this->competitionRepository->findById($id);
        if($competition){
            return response()->json([
                "success"=>true,
                "data"=>$competition,
                "message"=>"Catégorie trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Compétition inexistante"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //

        $competition=$this->competitionRepository->update($request->all(),$id);

        if ($competition){
            return response()->json([
                'success'=>true,
                'data'=>$competition,
                'message'=>"Compétition mise à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'une Compétition"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $competition=$this->competitionRepository->delete($id);
        if($competition>0){
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
