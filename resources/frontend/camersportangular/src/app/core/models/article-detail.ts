import { CategorieDetail } from "./categorie-detail";
import { PaysDetail } from "./pays-detail";
import { User } from "./user";
import { UserDetails } from "./user-details";

export interface ArticleDetail {
  id:number;
  hit:number;
  titre:string;
  slug:string;
  auteur:string;
  source:string;
  motclef:string;
  chapeau:string;
  article:string;
  image:string;
  date_parution:string;
  pays_code:string;
  user:UserDetails;
  pays:PaysDetail;
  categorie:CategorieDetail;
}
