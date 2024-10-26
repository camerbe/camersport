<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestUser;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    protected $userRepository;

    /**
     * @param $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $users=$this->userRepository->findAll();
        if ($users){
            return response()->json([
                'success'=>true,
                'data'=>$users,
                'message'=>"Liste des rédacteurs"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de rédacteur trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestUser $request)
    {
        //
        $user=$this->userRepository->create($request->all());

        if ($user){
            return response()->json([
                'success'=>true,
                'data'=>$user,
                'message'=>"Rédacteur inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un rédacteur"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $user=$this->userRepository->findById($id);
        if($user){
            return response()->json([
                "success"=>true,
                "data"=>$user,
                "message"=>"Rédacteur trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Rédacteur inexistant"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //

        $user=$this->userRepository->update($request->all(),$id);

        if ($user){
            return response()->json([
                'success'=>true,
                'data'=>$user,
                'message'=>"Rédacteur mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un rédacteur"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $user=$this->userRepository->delete($id);
        if($user>0){
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


}
