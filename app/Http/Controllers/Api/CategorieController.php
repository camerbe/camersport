<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestCategorie;
use App\Repositories\CategorieRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CategorieController extends Controller
{
    protected $categorieRepository;

    /**
     * @param $categorieRepository
     */
    public function __construct(CategorieRepository $categorieRepository)
    {
        $this->categorieRepository = $categorieRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $categories=$this->categorieRepository->findAll();
        if ($categories){
            return response()->json([
                'success'=>true,
                'data'=>$categories,
                'message'=>"Liste des catégories"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de catégorie trouvée"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestCategorie $request)
    {
        //
        $categorie=$this->categorieRepository->create($request->all());

        if ($categorie){
            return response()->json([
                'success'=>true,
                'data'=>$categorie,
                'message'=>"Catégorie insérée",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'une catégorie"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $categorie=$this->categorieRepository->findById($id);
        if($categorie){
            return response()->json([
                "success"=>true,
                "data"=>$categorie,
                "message"=>"Catégorie trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Catégorie inexistante"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //

        $categorie=$this->categorieRepository->update($request->all(),$id);

        if ($categorie){
            return response()->json([
                'success'=>true,
                'data'=>$categorie,
                'message'=>"Catégorie mise à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'une catégorie"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $categorie=$this->categorieRepository->delete($id);
        if($categorie>0){
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
