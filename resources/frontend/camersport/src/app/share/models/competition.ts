import {Categorie} from "./categorie";

export interface Competition {
  id:number,
  competition:string,
  slugcompetition:string
}
export interface Competitions{
  success:boolean,
  data:Competition,
  message:string
}
