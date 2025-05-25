import { CategorieDetail } from "./categorie-detail";
import { PaysDetail } from "./pays-detail";
import { User } from "./user";
import { UserDetails } from "./user-details";
import { ImageDetail } from "./image-detail"; // Ensure this file exists and defines ImageDetail
import { CompetitionDetail } from "./competition-detail";

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
  date_parution:Date;
  pays_code:string;
  categorie_id:number;
  competition_id:number;
  user:UserDetails;
  pays:PaysDetail;
  images: ImageDetail[];
  categorie: CategorieDetail;
  competition: CompetitionDetail;

}
