<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Vedmant\FeedReader\FeedReader;

class RssController extends Controller
{
    //
    protected $feedReader;

    /**
     * @param $feedReader
     */
    public function __construct(FeedReader $feedReader)
    {
        $this->feedReader = $feedReader;
    }
    public function getCamerRss(){
        $feddItems=$this->feedReader->read(env('CAMER_RSS_URL'));
        $items = collect($feddItems->get_items())
            ->take(5)
            ->map(function($item){
                $enclosure=$item->get_enclosure();
                return[
                  'titre'=>$item->get_title(),
                  'image'=>$enclosure ? $enclosure->get_link() : null,
                  'lien'=>$item->get_permalink(),
                ];
            });
        //$items=collect($feddItems->take(5));
        if($items);{
            return response()->json([
                'success'=>true,
                'data'=>$items,
                'message'=>"Liste des rss"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de flux rss"
        ],Response::HTTP_NOT_FOUND);

    }

}
