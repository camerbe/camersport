import { Player } from "./player";

export interface TeamSideData {
  team_a_id?: number; // Optional because either A or B
  team_b_id?: number;
  color_a?: string;
  color_b?: string;
  coach_a?: string;
  coach_b?: string;
  formation_a?: string;
  formation_b?: string;
  startingXI: Player[];
  substitutes: Player[];
}
