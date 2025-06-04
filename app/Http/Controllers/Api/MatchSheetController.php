<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Matchsheet;
use App\Services\MatchSheetService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MatchSheetController extends Controller
{
    protected MatchSheetService $matchSheetService;
    //protected $lastMatchSheet;

    /**
     * @param MatchSheetService $matchSheetService
     */
    public function __construct(MatchSheetService $matchSheetService)
    {
        $this->matchSheetService = $matchSheetService;
        //$this->lastMatchSheet=Matchsheet::last();
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $matchSheets=$this->matchSheetService->all();
        if ($matchSheets){
            return response()->json([
                'success'=>true,
                'data'=>$matchSheets,
                'message'=>"Liste des MatchSheets"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de MatchSheets trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $matchSheet=$this->matchSheetService->create($request->all());
        if ($matchSheet){
            return response()->json([
                'success'=>true,
                'data'=>$matchSheet,
                'message'=>"MatchSheet inséré"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de l'insertion d'un MatchSheet"
        ],Response::HTTP_NOT_FOUND);

    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $matchSheet=$this->matchSheetService->find($id);
        if ($matchSheet){
            return response()->json([
                'success'=>true,
                'data'=>$matchSheet,
                'message'=>"MatchSheet trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"MatchSheet non trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
        $matchSheet=$this->matchSheetService->update($request->all(),$id);
        if ($matchSheet){
            return response()->json([
                'success'=>true,
                'data'=>$matchSheet,
                'message'=>"MatchSheet mis à jour"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la mise à jour du MatchSheet"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $matchSheet=$this->matchSheetService->delete($id);
        if ($matchSheet){
            return response()->json([
                'success'=>true,
                'data'=>$matchSheet,
                'message'=>"MatchSheet supprimé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la suppression du MatchSheet"
        ],Response::HTTP_NOT_FOUND);
    }

    public function getLastMatchSheet(){
        $matchSheet=$this->matchSheetService->getLastMatchSheet();
        if ($matchSheet){
            return response()->json([
                'success'=>true,
                'data'=>$matchSheet,
                'message'=>"MatchSheet trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"MatchSheet non trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    public function getTeams(){
        $teams=$this->matchSheetService->getTeams();
        if ($teams){
            return response()->json([
                'success'=>true,
                'data'=>$teams,
                'message'=>"Teams trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Teams non trouvé"
        ],Response::HTTP_NOT_FOUND);
    }
}
