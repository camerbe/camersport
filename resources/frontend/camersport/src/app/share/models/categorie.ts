import {Competition} from "./competition";

export interface Categorie {
  id:number,
  categorie:string,
  slugcategorie:string,
  competition:Competition

}
export interface Categories{
  success:boolean,
  data:Categorie,
  message:string
}
