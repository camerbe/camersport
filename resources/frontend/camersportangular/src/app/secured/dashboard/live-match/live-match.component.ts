import { Player } from './../../../core/models/player';
import { AfterViewInit, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiveMatch } from '../../../core/models/live-match';
import { AuthService } from '../../../services/auth.service';
import { ExpiredAtService } from '../../../services/expired-at.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LiveMatchService } from '../../../services/live-match.service';
import { Team } from '../../../core/models/team';
import { MatchSheet } from '../../../core/models/match-sheet';
import { TeamDetail } from '../../../core/models/team-detail';
import { MatchSheetDetail } from '../../../core/models/match-sheet-detail';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { environment } from '../../../../environments/environment.development';
import { LiveMatchDetail } from '../../../core/models/live-match-detail';
import { MatchSheetService } from '../../../services/match-sheet.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.component.html',
  styleUrl: './live-match.component.css'
})
export class LiveMatchComponent implements OnInit, AfterViewInit {
  frmLiveMatch!: FormGroup;
  title:string="Ajout Live Match";
  link:string="/secured/live/list";
  label:string="Liste";
  isExpired!:boolean;
  isAddMode!:boolean;
  id!:number;
  teamA_name!:string;
  teamB_name!:string;
  erreur!:string;
  liveMatchs:LiveMatch[]=[];
  teams:TeamDetail[]=[];
  players:Player[]=[];
  matchSheet!:MatchSheetDetail;
  even_types = [
    { label: 'Annonce_temps_additionnel', value: 'Annonce_temps_additionnel' },
    { label: 'Arret_du_gardien', value: 'Arret_du_gardien' },
    { label: 'Blessure', value: 'Blessure' },
    { label: 'But', value: 'But' },
    { label: 'But_sur_penalty', value: 'But_sur_penalty' },
    { label: 'Carton_jaune', value: 'Carton_jaune' },
    { label: 'Carton_rouge', value: 'Carton_rouge' },
    { label: 'Commentaire', value: 'Commentaire' },
    { label: 'Contre_son_camp', value: 'Contre_son_camp' },
    { label: 'Coup_d_envoi', value: 'Coup_d_envoi' },
    { label: 'Fin_du_match', value: 'Fin_du_match' },
    { label: 'Hors_jeu', value: 'Hors_jeu' },
    { label: 'Mi_temps', value: 'Mi_temps' },
    { label: 'Passe_decisive', value: 'Passe_decisive' },
    { label: 'Penalty_manque', value: 'Penalty_manque' },
    { label: 'Prolongations', value: 'Prolongations' },
    { label: 'Remplacement', value: 'Remplacement' },
    { label: 'Seance_tirs_au_but', value: 'Seance_tirs_au_but' },
    { label: 'Seconde_mi_temps', value: 'Seconde_mi_temps' },
    { label: 'Verification_VAR', value: 'Verification_VAR' }
  ];
  isBrowser!: boolean;
  tinymce: any;
  //initImage: any= {};
  init: any= {};
  isTinyMceLoaded = false;


  teamSelected!: TeamDetail;

  onEventTypeChange($event: DropdownChangeEvent) {
    const selectedEventType = $event.value;
    const eventType = this.even_types.find(event => event.value === selectedEventType.value);
    //console.log(selectedEventType)
    if(selectedEventType==='But' && this.teamSelected){
      console.log(this.teamSelected)
      switch(this.teamSelected.name){
        case this.teamA_name:
          this.frmLiveMatch.patchValue({ score_a: (this.score_a?.value ?? 0) + 1 });
          break;
        case this.teamB_name:
          this.frmLiveMatch.patchValue({ score_b: (this.score_b?.value ?? 0) + 1 });
      }
    }
    if (eventType) {
      this.frmLiveMatch.patchValue({
        event_type: eventType
      });
    }

  }
  onPlayerChange($event: DropdownChangeEvent) {
    const selectedPlayer = $event.value;
    const joueur =this.players.find(player => player.name === selectedPlayer.name)
    if (joueur) {
      this.frmLiveMatch.patchValue({
        player: joueur
      });
    }

  }

  // fb:FormBuilder = inject(FormBuilder);
  // authSevice:AuthService=inject(AuthService);
  // expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  // router:Router=inject(Router);
  // activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  // liveMatchService:LiveMatchService=inject(LiveMatchService);
  // matchService:MatchSheetService=inject(MatchSheetService);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb:FormBuilder,
    private authSevice:AuthService,
    private expiredAtService:ExpiredAtService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private liveMatchService:LiveMatchService,
    private matchService:MatchSheetService
  ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
      this.frmLiveMatch=this.fb.group({
      matchsheet_id :['',Validators.required],
      team_id  :['',Validators.required],
      event_type  :['',Validators.required],
      player  :[null],
      event_minute  :[0],
      status: ['confirmed'],
      description: [''],
      event_second: [''],
      score_a: 0,
      score_b: 0,

    })
  }
  async ngAfterViewInit():Promise<void>  {
    if (!this.isBrowser) return;
    try {
      const tinymceModule = await import('tinymce');
      this.tinymce = tinymceModule.default;
      this.initTinyMceConfig();
      this.isTinyMceLoaded = true;
    } catch (error) {
      console.error('Error loading tinymce:', error);
      this.isTinyMceLoaded = false;
    }
  }
  initTinyMceConfig() {
    const baseConfig = {
      path_absolute: "/",
      relative_urls: false,
      base_url: '/tinymce',
      suffix: '.min',
      height: 450,
      file_picker_callback: (callback: any, value: any, meta: any) => {
        this.filePickerHandler(callback, value, meta);
      }
    };
    this.init = {
      ...baseConfig,
      menubar: 'file edit view insert format tools table tc help',
      toolbar_sticky: false,
      plugins: [
        'image', 'media', 'tools', 'link', 'advlist',
        'autolink', 'lists', 'table', 'wordcount', 'code', 'searchreplace'
      ],
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table mergetags blockquote'
    };
  }
  filePickerHandler(callback: any, value: any, meta: any) {
    const x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    const y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

    let cmsURL = `${environment.baseUrl}/laravel-filemanager?editor=${meta.fieldname}`;
    cmsURL += (meta.filetype == 'image') ? '&type=Images' : '&type=Files';

    this.tinymce.activeEditor.windowManager.openUrl({
      url: cmsURL,
      title: 'Camer-Sport',
      width: x * 0.8,
      height: y * 0.8,
      onMessage: (api: any, message: any) => {
        callback(message.content);
        api.close();
      }
    });
  }
  get matchsheet_id(){
    return this.frmLiveMatch.get('matchsheet_id');
  }
  get team_id (){
    return this.frmLiveMatch.get('team_id');
  }
  get player (){
    return this.frmLiveMatch.get('player');
  }
  get event_type (){
    return this.frmLiveMatch.get('event_type');
  }
  get event_minute (){
    return this.frmLiveMatch.get('event_minute');
  }
  get status (){
    return this.frmLiveMatch.get('status');
  }
  get description (){
    return this.frmLiveMatch.get('description');
  }
  get event_second (){
    return this.frmLiveMatch.get('event_second');
  }
  get score_a (){
    return this.frmLiveMatch.get('score_a');
  }
  get score_b (){
    return this.frmLiveMatch.get('score_b');
  }
  onTeamChange(event: any) {

    const selectedTeamId = event.value;
    const selectedTeam = this.teams.find(team => team.id === selectedTeamId);
    if (selectedTeam) {
      this.teamSelected=selectedTeam;
      this.players = this.matchSheet.team_a_data.team_a_id === selectedTeam.id
        ? this.matchSheet.team_a_data.startingXI
        : this.matchSheet.team_b_data.startingXI;
    }


  }
  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredAtService.updateState(this.authSevice.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authSevice.logout();

    this.liveMatchService.getTeams()
    .subscribe({
      next:(data) =>{
        const id=this.id;
        //console.log('i='+id);
        const tempData:Team=data as unknown as Team;
        this.teams=tempData["data"] as unknown as TeamDetail[];

      },
      error:(error)=>console.log(error)
    });

    this.liveMatchService.getLastMatchSheet()
    .subscribe({
      next:(data) =>{
        const tempData:MatchSheet=data as unknown as MatchSheet;
        this.matchSheet=tempData["data"] as unknown as MatchSheetDetail;
        this.players= this.matchSheet.team_a_data.startingXI;
        this.teams=this.teams.filter(team=>team.id===this.matchSheet.team_a_id || team.id===this.matchSheet.team_b_id );
        this.teamA_name = this.teams.find(value => value.id === this.matchSheet.team_a_id)?.name?.toString() || 'undefined';
        this.teamB_name = this.teams.find(value => value.id === this.matchSheet.team_b_id)?.name?.toString() || 'undefined';
        this.frmLiveMatch.patchValue({
          matchsheet_id:this.matchSheet.id
        });
      }
    });

    if (!this.isAddMode){
      this.title="Mise à jour du Live Match";
      this.liveMatchService.show(this.id)
      .subscribe({
        next:(data)=>{
          const tempData:LiveMatch=data as unknown as LiveMatch;
          const liveMatch:LiveMatchDetail=tempData["data"] as unknown as LiveMatchDetail;
          this.frmLiveMatch.patchValue({
            matchsheet_id:liveMatch.matchsheet_id,
            team_id:liveMatch.team_id,
            event_type:liveMatch.event_type,

            event_minute:liveMatch.event_minute,
            status:liveMatch.status,
            description:liveMatch.description
          });
          const teamId = liveMatch.team_id;
          if (this.matchSheet.team_a_data.team_a_id === teamId) {
            this.players = this.matchSheet.team_a_data.startingXI;
          } else {
            this.players = this.matchSheet.team_b_data.startingXI;
          }

          const selectedPlayer = this.players.find(p =>
            p.name === liveMatch.player.name
          );

          if (selectedPlayer) {
            this.frmLiveMatch.patchValue({
              player: selectedPlayer
            });
          }

        },
        error:(error)=>{
          this.erreur=error.error.message;
          console.log(this.erreur);
        }
      })
    }
  }

  onSubmit() {
    if(this.isAddMode){
      if(this.event_second?.value !== null && this.event_second?.value !== ''){
        this.frmLiveMatch.patchValue({
          event_minute: this.event_minute?.value + ':' + this.event_second?.value
        });
      }

      this.liveMatchService.create(this.frmLiveMatch.value)
      .subscribe({
        next:()=>this.router.navigate(['/secured/live/list']),
        error:(error)=>console.log(error)
      });
    }
    else{
      //console.log(this.frmLiveMatch.value);
      this.liveMatchService.patch(this.id,this.frmLiveMatch.value)
      .subscribe({
        next:()=>this.router.navigate(['/secured/live/list']),
        error:(error)=>console.log(error)
      });
    }
  }

}
