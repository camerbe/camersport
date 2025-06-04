import { Team } from "./team";
import { TeamSideData } from "./team-side-data";

export interface MatchData {
  id: number;
  team_a_id: number;
  team_b_id: number;
  match_date: string;
  formation_a: string;
  formation_b: string;
  color_a: string;
  color_b: string;
  coach_a: string;
  coach_b: string;
  referee: string;
  location: string;
  team_a_data: TeamSideData; // JSON string or parsed
  team_b_data: TeamSideData;
  A_team:Team;
  B_team:Team;
  created_at: string;
  updated_at: string;
}
