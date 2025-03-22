<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Repositories\ArticleRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ArticleController extends Controller
{
    protected $articleRepository;

    /**
     * @param $articleRepository
     */
    public function __construct(ArticleRepository $articleRepository)
    {
        $this->articleRepository = $articleRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $articles=$this->articleRepository->findAll();
        if ($articles){
            return response()->json([
                'success'=>true,
                'data'=>$articles,
                'message'=>"Liste des articles"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas d'article trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        //
        $article=$this->articleRepository->create($request->all());
        $image=ImageHelper::extractImgSrc($request->image);
        //dd($image);
        if ($article){
            $parsedUrl = parse_url($image);
            $path = $parsedUrl['path'];
            $filePath = str_replace(url('/storage'), 'storage', $path);
            $article->addMedia(public_path($filePath))->preservingOriginal()->toMediaCollection('article');

            return response()->json([
                'success'=>true,
                'data'=>$article,
                'message'=>"Article inséré",
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
        $article=$this->articleRepository->findById($id);
        if($article){
            return response()->json([
                "success"=>true,
                "data"=>$article,
                "message"=>"Article trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Article inexistant"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //

        $article=$this->articleRepository->update($request->all(),$id);

        if ($article){
            return response()->json([
                'success'=>true,
                'data'=>$article,
                'message'=>"Article mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un article"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $article=$this->articleRepository->delete($id);
        if($article>0){
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

    public function getArticleBySlug($slug){
        $article=$this->articleRepository->getArticleBySlug($slug);
        if($article){
            return response()->json([
                "success"=>true,
                "data"=>$article,
                "message"=>"Article trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Article inexistant"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * @param $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getArticleByUserId($user_id){
        $articles=$this->articleRepository->getArticleByUserId($user_id);
        if($articles){
            return response()->json([
                "success"=>true,
                "data"=>$articles,
                "message"=>"Articles trouvés"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Articles inexistants"
        ],Response::HTTP_NO_CONTENT);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCategories(){
        $categories=$this->articleRepository->getCategories();
        if ($categories){
            return response()->json([
                'success'=>true,
                'data'=>$categories,
                'message'=>"Liste des categories"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de categorie trouvée"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCompetitions(){
        $competitions=$this->articleRepository->getCompetitions();
        if ($competitions){
            return response()->json([
                'success'=>true,
                'data'=>$competitions,
                'message'=>"Liste des compétitions"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de compétition trouvée"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getCountries(){
        $countries=$this->articleRepository->getPays();
        if ($countries){
            return response()->json([
                'success'=>true,
                'data'=>$countries,
                'message'=>"Liste des pays"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de pays trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

}
