<?php

namespace App\Repositories;

use App\Http\Resources\ArticleResource;
use App\Http\Resources\CategorieResource;
use App\Http\Resources\CompetitionResource;
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

    /**
     * @param $id
     * @return ArticleResource
     */
    public function findById($id)
    {
        return new ArticleResource(parent::findById($id)) ;
    }

    /**
     * @param $slug
     * @return ArticleResource
     */
    public function findBySlug($slug)
    {
        return new ArticleResource(Article::find($slug)) ;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        return parent::delete($id);
    }

    /**
     * @param array $input
     * @param $id
     * @return mixed
     */
    public function update(array $input, $id)
    {
        $currentArticle=parent::findById($id);
        $input['titre']=isset($input['titre'])? Str::title($input['titre']):$currentArticle->titre;
        $input['titre']=Str::slug($input['titre']);
        $input["motclef"]=trim($input["motclef"]).",".$input["hashtag"];
        unset($input["competition_id"]);
        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return ArticleResource
     */
    public function create(array $input)
    {

        $html=new Html2Text($input['article']);
        $input['titre']=Str::title($input['titre']);
        $input['slug']=$this->addSlug($input['pays_code'],$input['titre']);
        $input['auteur']=Str::title($input['auteur']);
        $input['source']=Str::title($input['source']);
        $input['chapeau']=Str::of($html->getText())->limit(157);
        $input["date_parution"]=Carbon::parse($input["date_parution"])->format('Y-m-d H:i:s');
        $input["motclef"]=trim($input["motclef"]).",".$input["hashtag"];

        $competition=Competition::find($input["competition_id"]);

        if(is_null($competition->categories())){
            $competition->categories()->attach($input["categorie_id"]);
        }
        else{
            $competition->categories()->wherePivot('categorie_id',$input["categorie_id"])
                ->first() ?? $competition->categories()->attach($input["categorie_id"]);;
        }

        unset($input["competition_id"]);
        return new ArticleResource(parent::create($input));
    }

    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function findAll(){
        $articles=Article::where('date_parution','<=',now())
            ->paginate();
       return ArticleResource::collection($articles);
    }


    public function getCategories(){
        return  Categorie::orderBy('categorie','asc')->get();
        /*return CategorieResource::collection(
            Categorie::orderBy('categorie','asc')
        );*/
    }

    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function getCompetitions(){
        return Competition::orderBy('competition','asc')->get();
        /*return CompetitionResource::collection(
            Competition::orderBy('competition','asc')
        );*/
    }
    /*public function findWithPagination(){
        return CategorieResource::collection(
            Categorie::orderBy('categorie')
                ->paginate()

        );
    }*/

    private function addSlug($code3,$title){
        //dd($code3);
        $bled=Pays::where('code3',$code3)->first();
        $titre=Str::contains($title,$bled->pays,ignoreCase: true)? $title: $bled->pays."-".$title;
        $titre=Str::contains($titre,$bled->country,ignoreCase: true)? $titre: $titre."-".$bled->country;
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
    public function getScheduledArticle(){
        $articles=  Article::where("date_parution",">=",now())->orderByDesc('date_parution')->paginate();
        return ArticleResource::collection($articles);
    }
    public function getPays(){
        return Pays::orderBy('pays','asc')->get();
    }

}
