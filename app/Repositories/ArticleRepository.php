<?php

namespace App\Repositories;

use App\Http\Resources\ArticleResource;
use App\Http\Resources\CategorieResource;
use App\Models\Article;
use App\Models\Categorie;
use App\Models\Competition;
use App\Models\Pays;
use Html2Text\Html2Text;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class ArticleRepository extends BaseRepository
{

    public function __construct(Article $article)
    {
        $this->model=$article;
    }

    public function findById($id)
    {
        return new ArticleResource(parent::findById($id)) ;
    }
    public function findBySlug($slug)
    {
        return new ArticleResource(Article::find($slug)) ;
    }
    public function delete($id)
    {
        return parent::delete($id);
    }

    public function update(array $input, $id)
    {
        $currentArticle=parent::findById($id);
        $input['titre']=isset($input['titre'])? Str::title($input['titre']):$currentArticle->titre;
        $input['titre']=Str::slug($input['titre']);
        return parent::update($input, $id);
    }

    public function create(array $input)
    {

        $html=new Html2Text($input['article']);
        $input['titre']=Str::title($input['titre']);
        $input['slug']=$this->addSlug($input['pays_code'],$input['titre']);
        $input['auteur']=Str::title($input['auteur']);
        $input['source']=Str::title($input['source']);
        $input['chapeau']=Str::of($html->getText())->limit(157);
        $input["date_parution"]=Carbon::parse($input["date_parution"])->format('Y-m-d H:i:s');

        $competition=Competition::find($input["competition_id"]);
        $categorie=$competition->categories()
            ->wherePivot('categorie_id',$input["categorie_id"])
            ->first();
        if(is_null($categorie)){
            $competition->categories()->attach($input["categorie_id"]);
        }

        return new ArticleResource(parent::create($input));
    }

    public function findAll(){
        $articles=Article::where('date_parution','<=',now())
            ->get();
       return ArticleResource::collection($articles);
    }
    /*public function findWithPagination(){
        return CategorieResource::collection(
            Categorie::orderBy('categorie')
                ->paginate()

        );
    }*/

    private function addSlug($code,$title){
        $bleg=Pays::find($code);
        $titre=Str::contains($title,$bleg->pays,ignoreCase: true)? $title: $bleg->pays."-".$title;
        $titre=Str::contains($titre,$bleg->country,ignoreCase: true)? $titre: $titre."-".$bleg->country;
        return Str::slug($titre);

    }
    public function getArticleBySlug($slug){
        $article= Article::where('slug',$slug)->first();
        //dd($article);
        $article->hit++;
        $article->save();
        return new  ArticleResource($article);
    }
    public function getArticleByUserId($userid){
        $articles=  Article::where("user_id",$userid)->orderByDesc('date_parution')->paginate();
        return ArticleResource::collection($articles);
    }

}
