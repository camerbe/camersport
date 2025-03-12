import {Redacteur} from "./redacteur";
import {Categorie} from "./categorie";

export interface Articles {
  success:boolean,
  data:Article,
  message:string
}
export interface Country {
  code:string,
  code3:string,
  pays:string,
  country:string

}
export interface Article {
  id:number,
  hit:number,
  slug:string,
  auteur:string,
  source:string,
  motclef:string,
  chapeau:string,
  article:string,
  image:string,
  date_parution:Date,
  pays_code:string,
  user:Redacteur,
  pays:Country,
  categorie:Categorie

}




