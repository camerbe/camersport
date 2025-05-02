export interface MatchSheetDetail {
  id:number;
  team_a_id :number;
  team_b_id :number;
  match_date:Date;
  formation_a:string;
  formation_b:string;
  referee:string;
  location:string;
  team_a_data:[];
  team_b_data:[];
  coaching_staff:[];
}
