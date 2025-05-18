import { MatchSheetDetail } from "./match-sheet-detail";
import { Player } from "./player";

export interface LiveMatchDetail {
  id: number;
  matchsheet_id: number;
  team_id: number;
  player:Player;
  event_type: string;
  description: string;
  event_minute: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  matchsheet:MatchSheetDetail
}
