import { ChangeDetectorRef, Component, Inject, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { LiveMatchDataComponent } from "../../components/live-match-data/live-match-data.component";
import { MatchSheetReponse } from '../../../core/models/match-sheet-reponse';
import { Player } from '../../../core/models/player';
import { Formation } from '../../../core/models/formation';
import { FormationPosition } from '../../../core/models/formation-position';
import { MatchSheetService } from '../../../services/match-sheet.service';
import { FormationPositionService } from '../../../services/formation-position.service';
import { isPlatformBrowser } from '@angular/common';
import { LiveMatchService } from '../../../services/live-match.service';
import { switchMap } from 'rxjs';
import { LiveMatchDetail } from '../../../core/models/live-match-detail';
import { LiveMatch } from '../../../core/models/live-match';
import { DomSanitizer } from '@angular/platform-browser';
import { EchoService } from '../../../services/echo.service';


@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrl: './live.component.css'


})
export class LiveComponent implements OnInit,OnDestroy {
  lastMatchSheet!:MatchSheetReponse["data"];
    playersA:Player[]=[];
    playersB:Player[]=[];
    formationA!:Formation|undefined;
    formationB!:Formation|undefined;
    positionA: FormationPosition[] = [];
    positionB: FormationPosition[] = [];
    liveMatchs:LiveMatchDetail[]=[];
    lastBut: LiveMatchDetail[] =[];
    totalScore_a:number=0;
    totalScore_b:number=0;

    matchSheetService:MatchSheetService=inject(MatchSheetService);
    formationPosition:FormationPositionService=inject(FormationPositionService);
    liveMatchService:LiveMatchService=inject(LiveMatchService);
    sanitizer:DomSanitizer= inject(DomSanitizer);
    echoService:EchoService= inject(EchoService);
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private cd: ChangeDetectorRef
      ) {

      }
  ngOnDestroy(): void {
    this.echoService.leaveChannel();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)){
      this.echoService.subscribeToLivematchs((event) => {
        console.log('Livematch event:', event);

      });
      this.matchSheetService.getLastMtachSheet()
      .pipe(switchMap(response => {
        this.lastMatchSheet = response.data;
        //console.log(this.lastMatchSheet.A_team);
        const teamAData = JSON.parse(this.lastMatchSheet.team_a_data);
        const teamBData = JSON.parse(this.lastMatchSheet.team_b_data);
        this.playersA = teamAData.startingXI;
        this.playersB = teamBData.startingXI;
        this.formationA = this.formationPosition.getFormationByName(this.lastMatchSheet.formation_a);
        this.formationB = this.formationPosition.getFormationByName(this.lastMatchSheet.formation_b);
        this.positionA = this.formationA?.positions ?? [];
        this.positionB = this.formationB?.positions ?? [];
        return this.liveMatchService.getLiveMatch(this.lastMatchSheet.id);
        //console.log(this.positionA.find(pos => pos.value === "GK"));
      })).subscribe({
        next: data => {
          const tempData=data as unknown as LiveMatch;
          this.liveMatchs = tempData["data"]  as unknown as LiveMatchDetail[];
          this.liveMatchs.forEach((el)=>{
            if(el.score_a>0)
            {
              this.totalScore_a+=el.score_a;
              this.lastBut.push(el);
            }
            if(el.score_b>0)
            {
              this.totalScore_b+=el.score_b;
              this.lastBut.push(el);
            }
          });

          this.cd.detectChanges();

          console.log(this.lastBut[0].player);
          console.log(this.lastBut[1].player);
        }

      });

    }

  }

  getPositionStyleA(position: string): {position: string, left: string; top: string; transform: string } {
    const pos = this.positionA.find(pos => pos.value === position);

    return {
      position: 'absolute',
      left: (pos?.x ?? 0) + '%',
      top: (pos?.y ?? 0) + '%',
      transform: 'translate(-50%, -50%)'
    };
  }
  getPositionStyleB(position: string): { position: string,left: string; top: string; transform: string } {
    const pos = this.positionB.find(pos => pos.value === position);
    //console.log(`pos : ${pos?.y} ${pos?.x} ${pos?.value} ${pos?.label}`)
    return {
      position: 'absolute',
      left: (100 - (pos && pos.x !== undefined ? pos.x : 0)) + '%',
      top: ((pos && pos.y !== undefined) ? (100 - pos.y) : 100) + '%',
      transform: 'translate(-50%, -50%)'
    };
  }
  getIcon(type: string): string {
    switch (type) {
      case 'Annonce_temps_additionnel': return '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alarm-clock-icon lucide-alarm-clock text-amber-600 md:w-[48px] md:h-[48px] bg-amber-600 rounded "><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/></svg>';
      case 'Arret_du_gardien': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check-icon lucide-shield-check  text-cyan-700 md:w-[48px] md:h-[48px] rounded "><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>';
      case 'Blessure': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cross-icon lucide-cross text-red-700 md:w-[48px] md:h-[48px] rounded "><path d="M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"/></svg>';
      case 'But': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volleyball-icon lucide-volleyball text-cyan-500 md:w-[48px] md:h-[48px] rounded "><path d="M11.1 7.1a16.55 16.55 0 0 1 10.9 4"/><path d="M12 12a12.6 12.6 0 0 1-8.7 5"/><path d="M16.8 13.6a16.55 16.55 0 0 1-9 7.5"/><path d="M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10"/><path d="M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5"/><circle cx="12" cy="12" r="10"/></svg>';
      case 'But_sur_penalty': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target-icon lucide-target  text-fuchsia-600 md:w-[48px] md:h-[48px] rounded "><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>';
      case 'Carton_jaune': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-icon lucide-square text-amber-400 md:w-[48px] md:h-[48px] bg-amber-400 rounded "><rect width="18" height="18" x="3" y="3" rx="2"/></svg>';
      case 'Carton_rouge': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-icon lucide-square bg-red-500 rounded [ md:w-[48px] md:h-[48px] text-red-500"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>';
      case 'Commentaire': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-icon lucide-message-circle text-fuchsia-600  md:w-[48px] md:h-[48px] rounded "><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>';
      case 'Contre_son_camp': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-cw-icon lucide-rotate-cw text-red-700  md:w-[48px] md:h-[48px] rounded "><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>';
      case 'Coup_d_envoi': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flag-icon lucide-flag  text-green-800  md:w-[48px] md:h-[48px] rounded "><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>';
      case 'Fin_du_match': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flag-off-icon lucide-flag-off  text-red-800  md:w-[48px] md:h-[48px] rounded "><path d="M8 2c3 0 5 2 8 2s4-1 4-1v11"/><path d="M4 22V4"/><path d="M4 15s1-1 4-1 5 2 8 2"/><line x1="2" x2="22" y1="2" y2="22"/></svg>';
      case 'Hors_jeu': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off  text-amber-700  md:w-[48px] md:h-[48px] rounded "><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>';
      case 'Mi_temps': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause-icon lucide-pause  text-amber-700  md:w-[48px] md:h-[48px] rounded "><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>';
      case 'Passe_decisive': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-right-up-icon lucide-corner-right-up"><path d="m10 9 5-5 5 5"/><path d="M4 20h7a4 4 0 0 0 4-4V4"/></svg>';
      case 'Penalty_manque': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-off-icon lucide-circle-off  text-red-700  md:w-[48px] md:h-[48px] rounded"><path d="m2 2 20 20"/><path d="M8.35 2.69A10 10 0 0 1 21.3 15.65"/><path d="M19.08 19.08A10 10 0 1 1 4.92 4.92"/></svg>';
      case 'Prolongations': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hourglass-icon lucide-hourglass  text-amber-700  md:w-[48px] md:h-[48px] rounded"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>';
      case 'Remplacement': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat-icon lucide-repeat bg-indigo-600"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>';
      case 'Seance_tirs_au_but': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dot-icon lucide-circle-dot  text-amber-700  md:w-[48px] md:h-[48px] rounded"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/></svg>';
      case 'Verification_VAR': return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-icon lucide-monitor  text-green-700  md:w-[48px] md:h-[48px] rounded"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>';
      default: return 'pi pi-info-circle';
    }
  }
  hasPlayer(player: any): boolean {
    return player !== null && player !== undefined && player !== '' && player !== '""';
  }

  cleanPlayer(player: string): string {
  // Retirer les guillemets doubles ou simples s'ils entourent la chaîne
    return player?.replace(/^['"]|['"]$/g, '') ?? '';
  }

}
