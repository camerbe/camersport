import { TeamAData } from "./team-a-data";
import { TeamBData } from "./team-b-data";
import { TeamData } from "./team-data";

export interface MatchSheetDetail {

  id:number;
  team_a_id :number;
  team_b_id :number;
  match_date:Date;
  formation_a:string;
  formation_b:string;
  referee:string;
  location:string;
  team_a_data:TeamAData;
  team_b_data:TeamBData;
  coach_a:string;
  coach_b:string;
  color_a:string;
  color_b:string;
}
