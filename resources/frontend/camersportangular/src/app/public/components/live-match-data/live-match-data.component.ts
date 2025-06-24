import { FormationPosition } from './../../../core/models/formation-position';
import { TeamData } from './../../../core/models/team-data';
import { MatchSheetService } from './../../../services/match-sheet.service';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatchSheetReponse } from '../../../core/models/match-sheet-reponse';
import { Player } from '../../../core/models/player';
import { FormationPositionService } from '../../../services/formation-position.service';
import { Formation } from '../../../core/models/formation';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-live-match-data',
  templateUrl: './live-match-data.component.html',
  styleUrl: './live-match-data.component.css'
})
export class LiveMatchDataComponent implements OnInit {
  lastMatchSheet!:MatchSheetReponse["data"];
  playersA:Player[]=[];
  playersB:Player[]=[];
  formationA!:Formation|undefined;
  formationB!:Formation|undefined;
  positionA: FormationPosition[] = [];
  positionB: FormationPosition[] = [];
  isBrowser!: boolean;

  // matchSheetService:MatchSheetService=inject(MatchSheetService);
  // formationPosition:FormationPositionService=inject(FormationPositionService);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private matchSheetService: MatchSheetService,
    private formationPosition: FormationPositionService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // this.matchSheetService.getLastMtachSheet()
    //   .subscribe((response)=>{
    //     this.lastMatchSheet=response.data
    //     const teamAData=JSON.parse(this.lastMatchSheet.team_a_data);
    //     const teamBData=JSON.parse(this.lastMatchSheet.team_b_data);
    //     this.playersA=teamAData.startingXI;
    //     this.playersB=teamAData.startingXI;
    //     this.formationA=this.formationPosition.getFormationByName(this.lastMatchSheet.formation_a);
    //     this.formationB=this.formationPosition.getFormationByName(this.lastMatchSheet.formation_a);
    //     this.positionA = this.formationA?.positions ?? [];
    //     this.positionB = this.formationB?.positions ?? [];
    //   });
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.matchSheetService.getLastMtachSheet()
      .subscribe((response)=>{
        this.lastMatchSheet=response.data
        const teamAData=JSON.parse(this.lastMatchSheet.team_a_data);
        const teamBData=JSON.parse(this.lastMatchSheet.team_b_data);
        this.playersA=teamAData.startingXI;
        this.playersB=teamAData.startingXI;
        this.formationA=this.formationPosition.getFormationByName(this.lastMatchSheet.formation_a);
        this.formationB=this.formationPosition.getFormationByName(this.lastMatchSheet.formation_a);
        this.positionA = this.formationA?.positions ?? [];
        this.positionB = this.formationB?.positions ?? [];
        //console.log(this.positionA.find(pos => pos.value === "GK"));
      });
  }

  getPositionStyleA(position: string): { left: string; top: string; transform: string } {
    const pos = this.positionA.find(pos => pos.value === position);
    return {
      left: (pos?.x ?? 0) + '%',
      top: (pos?.y ?? 0) + '%',
      transform: 'translate(-50%, -50%)'
    };
  }
  getPositionStyleB(position: string): { left: string; top: string; transform: string } {
    const pos = this.positionB.find(pos => pos.value === position);
    return {
      left: (100 - (pos && pos.x !== undefined ? pos.x : 0)) + '%',
      top: ((pos && pos.y !== undefined) ? (100 - pos.y) : 100) + '%',
      transform: 'translate(-50%, -50%)'
    };
  }


}
