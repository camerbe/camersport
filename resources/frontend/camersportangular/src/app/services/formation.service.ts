import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private formations={
    '4-4-2': {
      positions: [
        { code: 'GK', x: 5, y: 50 },
        { code: 'RB', x: 20, y: 85 },
        { code: 'CB', x: 20, y: 65 },
        { code: 'CB', x: 20, y: 35 },
        { code: 'LB', x: 20, y: 15 },
        { code: 'RM', x: 45, y: 80 },
        { code: 'CM', x: 45, y: 50 },
        { code: 'CM', x: 45, y: 20 },
        { code: 'LM', x: 45, y: 15 },
        { code: 'ST', x: 70, y: 60 },
        { code: 'ST', x: 70, y: 40 }
      ]
    },
    '4-3-3': {
      positions: [
        { code: 'GK', x: 5, y: 50 },
        { code: 'RB', x: 20, y: 85 },
        { code: 'CB', x: 20, y: 65 },
        { code: 'CB', x: 20, y: 35 },
        { code: 'LB', x: 20, y: 15 },
        { code: 'CDM', x: 35, y: 50 },
        { code: 'CM', x: 45, y: 70 },
        { code: 'CM', x: 45, y: 30 },
        { code: 'RW', x: 65, y: 80 },
        { code: 'LW', x: 65, y: 20 },
        { code: 'ST', x: 70, y: 50 }
      ]
    },
    '3-5-2':{
      positions: [
        { code: 'GK', x: 5, y: 50 },
        { code: 'CB', x: 20, y: 70 },
        { code: 'CB', x: 20, y: 50 },
        { code: 'CB', x: 20, y: 30 },
        { code: 'RM', x: 40, y: 85 },
        { code: 'CM', x: 40, y: 65 },
        { code: 'CM', x: 40, y: 35 },
        { code: 'LM', x: 40, y: 15 },
        { code: 'CDM', x: 30, y: 50 },
        { code: 'ST', x: 70, y: 60 },
        { code: 'ST', x: 70, y: 40 }
      ]
    }
  };
  getFormation(formationCode: '4-4-2' | '4-3-3' | '3-5-2') {
    return this.formations[formationCode] || this.formations['4-4-2'];
  }
  getAvailableFormations() {
    return Object.keys(this.formations);
  }
}
