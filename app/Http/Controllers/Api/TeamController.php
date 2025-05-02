<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Services\TeamService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TeamController extends Controller
{
    protected TeamService $teamService;

    /**
     * @param TeamService $teamService
     */
    public function __construct(TeamService $teamService)
    {
        $this->teamService = $teamService;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $teams=$this->teamService->all();
        if ($teams){

            return response()->json([
                'success'=>true,
                'data'=>$teams,
                //'photo'=>$photos,
                'message'=>"Liste des Teams"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de Team trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $team=$this->teamService->create($request->all());
        $image=ImageHelper::extractImgSrc($request->logo);
        //dd($request->logo);
        if ($team){
            if($image){
                $parsedUrl = parse_url($image);
                $path = $parsedUrl['path'];
                $filePath = str_replace(url('/storage'), 'storage', $path);
                $team->addMedia(public_path($filePath))
                    ->preservingOriginal()
                    ->withResponsiveImages()
                    ->usingName($team->name)
                    ->toMediaCollection('team');
            }

            return response()->json([
                'success'=>true,
                'data'=>$team,
                'message'=>"Team inséré"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de l'insertion d'un Team"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $team=$this->teamService->find($id);
        if ($team){
            return response()->json([
                'success'=>true,
                'data'=>$team,
                'message'=>"Team trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Team non trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
        $team=$this->teamService->update($request->all(),$id);
        $image=ImageHelper::extractImgSrc($request->logo);
        if ($team){
            $media =$team->getMedia('team')->firstWhere('name',$team->name);
            if($media){
               $media->delete();
                $parsedUrl = parse_url($image);
                $path = $parsedUrl['path'];
                $filePath = str_replace(url('/storage'), 'storage', $path);
                $team->addMedia(public_path($filePath))
                    ->preservingOriginal()
                    ->withResponsiveImages()
                    ->usingName($team->name)
                    ->toMediaCollection('team');
            }

            return response()->json([
                'success'=>true,
                'data'=>$team,
                'message'=>"Team mis à jour"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la mise à jour du Team"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $team=$this->teamService->delete($id);
        if ($team){
            return response()->json([
                'success'=>true,
                'data'=>$team,
                'message'=>"Team supprimé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la suppression du Team"
        ],Response::HTTP_NOT_FOUND);
    }
}
