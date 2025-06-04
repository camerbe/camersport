import { Player } from "./player";

export interface TeamMatchInfo {
  team_id: number;
  color: string;
  coach: string;
  formation: string;
  startingXI: Player[];
  substitutes: Player[];
}

export function parseTeamData(jsonString: string): TeamMatchInfo {
  const rawData = JSON.parse(jsonString);

  // Détection automatique du type d'équipe (A ou B)
  const isTeamA = 'team_a_id' in rawData;

  return {
    team_id: isTeamA ? rawData.team_a_id : rawData.team_b_id,
    color: isTeamA ? rawData.color_a : rawData.color_b,
    coach: isTeamA ? rawData.coach_a : rawData.coach_b,
    formation: isTeamA ? rawData.formation_a : rawData.formation_b,
    startingXI: rawData.startingXI,
    substitutes: rawData.substitutes
  };
}
