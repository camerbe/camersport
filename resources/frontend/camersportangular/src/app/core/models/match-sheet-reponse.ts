import { Team } from "./team";
import { TeamDetail } from "./team-detail";

export interface MatchSheetReponse {
  success: boolean;
  data: {
    id: number;
    team_a_id: number;
    team_b_id: number;
    match_date: Date;
    formation_a: string;
    formation_b: string;
    color_a: string;
    color_b: string;
    coach_a: string;
    coach_b: string;
    referee: string;
    location: string;
    team_a_data: string; // JSON string de TeamMatchInfo
    team_b_data: string; // JSON string de TeamMatchInfo
    A_team:TeamDetail;
    B_team:TeamDetail;
    created_at: string;
    updated_at: string;
  };
  message: string;
}
