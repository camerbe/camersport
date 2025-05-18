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
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use function PHPUnit\Framework\isNull;

class ArticleRepository extends Repository implements IArticleRepository
{

    public function __construct(Article $article)
    {
        parent::__construct($article);
    }

    /**
     * @param $id
     * @return ArticleResource
     */
    public function find($id)
    {
        return new ArticleResource(parent::find($id)) ;
    }

    public function all($orderBy = ['date_parution' => 'desc'])
    {
        $cacheKey='article-list';
        $duration=now()->addMonth(1);
        $articles = Cache::remember($cacheKey, $duration, function () {
            return Article::with(['media'])->where('date_parution', '<=', now())
                ->take(100)
                ->get();
        });
        return ArticleResource::collection($articles);


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
     * @param array $data
     * @param $id
     * @return mixed
     */
    public function update($id,array $data)
    {
        $currentArticle=parent::find($id);
        $data['titre']=isset($data['titre'])? Str::title($data['titre']):$currentArticle->titre;
        $data['slug']=$this->addSlug($data['pays_code'],$data['titre']);
        $data["motclef"]=trim($data["motclef"]).",".$data["hashtag"];
        $data["date_parution"]=isset($data['date_parution']) ?
            Carbon::parse($data["date_parution"])->format('Y-m-d H:i:s')
            :$currentArticle->date_parution;
        unset($data["competition_id"]);
        unset($data["hashtag"]);
        return parent::update($id, $data);
    }

    /**
     * @param array $data
     * @return ArticleResource
     */
    public function create(array $data)
    {

        $html=new Html2Text($data['article']);
        $data['titre']=Str::title($data['titre']);
        $data['slug']=$this->addSlug($data['pays_code'],$data['titre']);
        $data['auteur']=Str::title($data['auteur']);
        $data['source']=Str::title($data['source']);
        $data['chapeau']=Str::of($html->getText())->limit(157);
        $data["date_parution"]=Carbon::parse($data["date_parution"])->format('Y-m-d H:i:s');
        $data["motclef"]=trim($data["motclef"]).",".$data["hashtag"];

        $competition=Competition::find($data["competition_id"]);

        if(is_null($competition->categories())){
            $competition->categories()->attach($data["categorie_id"]);
        }
        else{
            $competition->categories()->wherePivot('categorie_id',$data["categorie_id"])
                ->first() ?? $competition->categories()->attach($data["categorie_id"]);;
        }

        unset($data["competition_id"]);
        return new ArticleResource(parent::create($data));
    }

    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    /*public function findAll(){
        $articles=Article::where('date_parution','<=',now())
            ->paginate();
       return ArticleResource::collection($articles);
    }*/


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
        $article= Article::with(['bled','categorie'])->where('slug', $slug)->first();
        if($article){
            $article->hit++;
            $article->save();
        }
        return new  ArticleResource($article);
    }
    public function getArticleByUserId($userId){
        $articles=  Article::where("user_id",$userId)->orderByDesc('date_parution')->paginate();
        return ArticleResource::collection($articles);
    }
    public function getScheduledArticle(){
        $articles=  Article::where("date_parution",">=",now())->orderByDesc('date_parution')->paginate();
        return ArticleResource::collection($articles);
    }
    public function getPays(){
        return Pays::orderBy('pays','asc')->get();
    }

    function publicIndex()
    {
        //Cache::forget('article-list');
        $cacheKey = 'article-list';
        $articles=Cache::get($cacheKey , collect());

        if(!isNull($articles)){
            //dd($articles);
            return ArticleResource::collection($articles);
        }
        return ArticleResource::collection($this->all($orderBy = ['date_parution' => 'desc']));


    }
    function getArticleByCompetition(int $competitionId)
    {
        //\DB::enableQueryLog();
        $articles = Article::where('date_parution', '<=', now())
            ->orderByDesc('date_parution')
            ->leftJoin('pays', 'articles.pays_code', '=', 'pays.code3')
            ->leftJoin('users', 'articles.user_id', '=', 'users.id')
            ->leftJoin('categories', 'articles.categorie_id', '=', 'categories.id')
            ->leftJoin('categorie_competition', 'categories.id', '=', 'categorie_competition.categorie_id')
            ->leftJoin('competitions', 'categorie_competition.competition_id', '=', 'competitions.id')
            ->where('categorie_competition.competition_id', $competitionId)
            ->select('articles.*')
            ->take(6)
            ->get();


        /*$articles=Article::with(['user','bled','categorie.competitions'])
                ->where('date_parution','<=',now())
                ->whereHas('categorie.competitions',function ($query) use ($competitionId) {
                    $query->where('competitions.id',$competitionId);
                })
                ->take(6)
                ->get();*/

        return ArticleResource::collection($articles);
        //dd(\DB::getQueryLog());
    }
}
