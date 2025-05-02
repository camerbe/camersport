import { Injectable } from '@angular/core';
import { Formation } from '../core/models/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationPositionService {

  formations: Formation[] = [
    // Formation 4-4-2 Classique
    {
      name: "4-4-2",
      positions: [
        { label: "Gardien", value: "GK", x: 50, y: 5 },
        { label: "Défenseur droit", value: "RB", x: 25, y: 20 },
        { label: "Défenseur central", value: "CB", x: 40, y: 20 },
        { label: "Défenseur central", value: "CB", x: 60, y: 20 },
        { label: "Défenseur gauche", value: "LB", x: 75, y: 20 },
        { label: "Milieu droit", value: "RM", x: 25, y: 45 },
        { label: "Milieu central", value: "CM", x: 40, y: 45 },
        { label: "Milieu central", value: "CM", x: 60, y: 45 },
        { label: "Milieu gauche", value: "LM", x: 75, y: 45 },
        { label: "Attaquant", value: "ST", x: 40, y: 75 },
        { label: "Attaquant", value: "ST", x: 60, y: 75 },
      ],
    },

    // Formation 4-3-3 Attaquant
    {
      name: "4-3-3",
      positions: [
        { label: "Gardien", value: "GK", x: 50, y: 5 },
        { label: "Défenseur droit", value: "RB", x: 25, y: 20 },
        { label: "Défenseur central", value: "CB", x: 40, y: 20 },
        { label: "Défenseur central", value: "CB", x: 60, y: 20 },
        { label: "Défenseur gauche", value: "LB", x: 75, y: 20 },
        { label: "Milieu défensif", value: "CDM", x: 50, y: 40 },
        { label: "Milieu central", value: "CM", x: 35, y: 50 },
        { label: "Milieu central", value: "CM", x: 65, y: 50 },
        { label: "Ailier droit", value: "RW", x: 15, y: 70 },
        { label: "Ailier gauche", value: "LW", x: 85, y: 70 },
        { label: "Attaquant", value: "ST", x: 50, y: 80 },
      ],
    },

    // Formation 4-2-3-1
    {
      name: "4-2-3-1",
      positions: [
        { label: "Gardien", value: "GK", x: 50, y: 5 },
        { label: "Défenseur droit", value: "RB", x: 25, y: 20 },
        { label: "Défenseur central", value: "CB", x: 40, y: 20 },
        { label: "Défenseur central", value: "CB", x: 60, y: 20 },
        { label: "Défenseur gauche", value: "LB", x: 75, y: 20 },
        { label: "Milieu défensif", value: "CDM", x: 40, y: 40 },
        { label: "Milieu défensif", value: "CDM", x: 60, y: 40 },
        { label: "Milieu droit", value: "RM", x: 25, y: 60 },
        { label: "Milieu central", value: "CM", x: 50, y: 65 },
        { label: "Milieu gauche", value: "LM", x: 75, y: 60 },
        { label: "Attaquant", value: "ST", x: 50, y: 85 },
      ],
    },

    // Formation 3-5-2
    {
      name: "3-5-2",
      positions: [
        { label: "Gardien", value: "GK", x: 50, y: 5 },
        { label: "Défenseur central", value: "CB", x: 30, y: 20 },
        { label: "Défenseur central", value: "CB", x: 50, y: 20 },
        { label: "Défenseur central", value: "CB", x: 70, y: 20 },
        { label: "Milieu droit", value: "RM", x: 20, y: 45 },
        { label: "Milieu central", value: "CM", x: 40, y: 50 },
        { label: "Milieu central", value: "CM", x: 60, y: 50 },
        { label: "Milieu central", value: "CM", x: 50, y: 60 },
        { label: "Milieu gauche", value: "LM", x: 80, y: 45 },
        { label: "Attaquant", value: "ST", x: 40, y: 80 },
        { label: "Attaquant", value: "ST", x: 60, y: 80 },
      ],
    },

    // Formation 5-3-2 Défensif
    {
      name: "5-3-2",
      positions: [
        { label: "Gardien", value: "GK", x: 50, y: 5 },
        { label: "Défenseur droit", value: "RB", x: 20, y: 15 },
        { label: "Défenseur central", value: "CB", x: 35, y: 15 },
        { label: "Défenseur central", value: "CB", x: 50, y: 15 },
        { label: "Défenseur central", value: "CB", x: 65, y: 15 },
        { label: "Défenseur gauche", value: "LB", x: 80, y: 15 },
        { label: "Milieu défensif", value: "CDM", x: 50, y: 35 },
        { label: "Milieu central", value: "CM", x: 35, y: 50 },
        { label: "Milieu central", value: "CM", x: 65, y: 50 },
        { label: "Attaquant", value: "ST", x: 40, y: 80 },
        { label: "Attaquant", value: "ST", x: 60, y: 80 },
      ],
    },
  ];
  getFormationPositions(formationName: string): Formation | undefined {
    return this.formations.find(formation => formation.name === formationName);
  }
  getFormationNames(): string[] {
    return this.formations.map(formation => formation.name);
  }
  getFormationByName(name: string): Formation | undefined {
    return this.formations.find(formation => formation.name === name);
  }
  getFormationById(id: string): Formation | undefined {
    return this.formations.find(formation => formation.name === id);
  }
  getFormationPositionById(id: string): Formation | undefined {
    return this.formations.find(formation => formation.name === id);
  }
  getFormationPositionByName(name: string): Formation | undefined {
    return this.formations.find(formation => formation.name === name);
  }
  getFormationPositionByValue(value: string): Formation | undefined {
    return this.formations.find(formation => formation.positions.some(position => position.value === value));
  }
  getFormationPositionByLabel(label: string): Formation | undefined {
    return this.formations.find(formation => formation.positions.some(position => position.label === label));
  }
  getFormationPositionByX(x: number): Formation | undefined {
    return this.formations.find(formation => formation.positions.some(position => position.x === x));
  }
  getFormationPositionByY(y: number): Formation | undefined {
    return this.formations.find(formation => formation.positions.some(position => position.y === y));
  }
  getFormationPositionByXY(x: number, y: number): Formation | undefined {
    return this.formations.find(formation => formation.positions.some(position => position.x === x && position.y === y));
  }
}
