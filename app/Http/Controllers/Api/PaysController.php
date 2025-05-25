<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestPays;
use App\Repositories\PaysRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PaysController extends Controller
{
    protected $paysRepository;

    /**
     * @param $paysRepository
     */
    public function __construct(PaysRepository $paysRepository)
    {
        $this->paysRepository = $paysRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $bleds=$this->paysRepository->findAll();
        if ($bleds){
            return response()->json([
                'success'=>true,
                'data'=>$bleds,
                'message'=>"Liste des pays"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de pays trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestPays $request)
    {
        //
        $bled=$this->paysRepository->create($request->all());

        if ($bled){
            return response()->json([
                'success'=>true,
                'data'=>$bled,
                'message'=>"Pays inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un pays"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $bled=$this->paysRepository->findByCode($id);
        if($bled){
            return response()->json([
                "success"=>true,
                "data"=>$bled,
                "message"=>"Pays trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pays inexistant"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //

        $bled=$this->paysRepository->update($request->all(),$id);

        if ($bled){
            return response()->json([
                'success'=>true,
                'data'=>$bled,
                'message'=>"Pays mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un Pays"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(sting $id)
    {
        //
        $bled=$this->paysRepository->delete($id);
        if($bled>0){
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
