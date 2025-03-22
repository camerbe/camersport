import { CompetitionDetail } from "./competition-detail";

export interface CategorieDetail {
  id:number;
  categorie:string;
  competitions:CompetitionDetail[];
}
