import { CompetitionDetail } from "./competition-detail";

export interface CategorieDetail {
  id:number;
  categorie:string;
  slugcategorie:string;
  competitions:CompetitionDetail[];
}
