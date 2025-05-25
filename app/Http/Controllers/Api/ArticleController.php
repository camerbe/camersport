<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Repositories\ArticleRepository;
use App\Services\ArticleService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ArticleController extends Controller
{
    protected $articleService;

    /**
     * @param $articleRepository
     */
    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $articles=$this->articleService->all();
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
        $article=$this->articleService->create($request->all());

        $image=ImageHelper::extractImgSrc($request->image);
        //dd($image);
        if ($article){
            if($image){
                $parsedUrl = parse_url($image);
                $path = $parsedUrl['path'];
                $filePath = str_replace(url('/storage'), 'storage', $path);
                $article->addMedia(public_path($filePath))
                    ->preservingOriginal()
                    ->withResponsiveImages()
                    ->usingName($article->slug)
                    ->toMediaCollection('article');
            }
            $this->articleService->publicIndex();
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
        $article=$this->articleService->find($id);
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

        $article=$this->articleService->update($request->all(),$id);
        $this->articleService->publicIndex();
        $image=ImageHelper::extractImgSrc($request->image);
        if ($article){

            $media =$article->getMedia('article')->where('name',$article->slug)->first();

            if($media) {
                //dd($media);
                $media->delete();
            }
            $parsedUrl = parse_url($image);
            $path = $parsedUrl['path'];
            $filePath = str_replace(url('/storage'), 'storage', $path);
            $article->addMedia(public_path($filePath))
                ->preservingOriginal()
                ->withResponsiveImages()
                ->usingName($article->slug)
                ->toMediaCollection('article');
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
        $article=$this->articleService->delete($id);
        if($article>0){
            $this->articleService->publicIndex();
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
        $article=$this->articleService->getArticleBySlug($slug);

        if($article){
            //$mediaUrl = $article->getFirstMedia('article');

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
        $articles=$this->articleService->getArticleByUserId($user_id);
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
        $categories=$this->articleService->getCategories();
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
        $competitions=$this->articleService->getCompetitions();
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
        $countries=$this->articleService->getPays();
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

    public function publicIndex(){
        $articles=$this->articleService->publicIndex();
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
    public function getArticleByCompetition($competitionId){
        $articles=$this->articleService->getArticleByCompetition($competitionId);
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
    public function getCategorieMustReadedArticle($categorieId){
        $articles=$this->articleService->categorieMustReaded($categorieId);
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
    public function getCompetitionMustReadedArticle($competitionId){
        $articles=$this->articleService->competitionMustReaded($competitionId);
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

}
