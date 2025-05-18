import { TeamData } from './../../../core/models/team-data';
import { Component, inject, OnInit } from '@angular/core';
import { Team } from '../../../core/models/team';
import { MatchSheetDetail } from '../../../core/models/match-sheet-detail';
import { MatchSheetService } from '../../../services/match-sheet.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ExpiredAtService } from '../../../services/expired-at.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamDetail } from '../../../core/models/team-detail';
import { DatePipe } from '@angular/common';
import { Player } from '../../../core/models/player';
import { TeamAData } from '../../../core/models/team-a-data';
import { TeamBData } from '../../../core/models/team-b-data';

@Component({
  selector: 'app-match-sheet',
  templateUrl: './match-sheet.component.html',
  styleUrl: './match-sheet.component.css',
  providers: [DatePipe]
})
export class MatchSheetComponent implements OnInit {
  matchSheet: any;
  teams: TeamDetail[] = [];
  id!: number;
  isAddMode!: boolean;
  title:string="Ajout feuille de match";
  link:string="/secured/dashboard/matchsheet/list";
  label:string="Liste";
  msg!:string;
  isExpired!:boolean;
  lastMatchSheet!: MatchSheetDetail;
  matchForm!: FormGroup;
  formations = [
    { id: '4-3-3', name: '4-3-3' },
    { id: '4-4-2', name: '4-4-2' },
    { id: '3-5-2', name: '3-5-2' },
    { id: '4-2-3-1', name: '4-2-3-1' },
    { id: '5-3-2', name: '5-3-2' }
  ];

  positions = [

    { label: 'Gardien', value: 'GK' },
    { label: 'Défenseur droit', value: 'RB' },
    { label: 'Défenseur central', value: 'CB' },
    { label: 'Défenseur gauche', value: 'LB' },
    { label: 'Milieu défensif', value: 'CDM' },
    { label: 'Milieu droit', value: 'RM' },
    { label: 'Milieu central', value: 'CM' },
    { label: 'Milieu gauche', value: 'LM' },
    { label: 'Ailier droit', value: 'RW' },
    { label: 'Ailier gauche', value: 'LW' },
    { label: 'Attaquant', value: 'ST' }

  ];

  fb:FormBuilder = inject(FormBuilder);
  matchSheetService: MatchSheetService=inject(MatchSheetService);
  authSevice:AuthService=inject(AuthService);
  expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  datePipe:DatePipe=inject(DatePipe);

  constructor() {
    this.matchForm = this.fb.group({
      match_date: ['', Validators.required],
      location: ['', Validators.required],
      referee: ['', Validators.required],
      teamA: this.createTeamFormGroup('A'),
      teamB: this.createTeamFormGroup('B')

    });
  }

  private createTeamFormGroup(teamPrefix: 'A' | 'B'): FormGroup {
    return this.fb.group({
      [`team_${teamPrefix.toLowerCase()}_id`]: ['', Validators.required],
      [`color_${teamPrefix.toLowerCase()}`]: ['', Validators.required],
      [`coach_${teamPrefix.toLowerCase()}`]: ['', Validators.required],
      [`formation_${teamPrefix.toLowerCase()}`]: ['', Validators.required],
      startingXI: this.fb.array(this.createPlayersArray(11)),
      substitutes: this.fb.array(this.createPlayersArray(5)),
    });
  }
  get match_date(){
    return this.matchForm.get('match_date');
  }
  get referee(){
    return this.matchForm.get('referee');
  }

  get teamB_id(){
    return this.matchForm.get('teamB.team_b_id');
  }
  get teamA_id(){
    return this.matchForm.get('teamA.team_a_id');
  }
  get colorA(){
    return this.matchForm.get('teamA.color_a');
  }
  get colorB(){
    return this.matchForm.get('teamB.color_b');
  }
  get coachA(){
    return this.matchForm.get('teamA.coach_a');
  }
  get formationA(){
    return this.matchForm.get('teamA.formation_a');
  }
  get formationB(){
    return this.matchForm.get('teamB.formation_b');
  }
  get coachB(){
    return this.matchForm.get('teamB.coach_b');
  }
  get location(){
    return this.matchForm.get('location');
  }
  get teamAStartingXI(): FormArray {
    return this.matchForm.get('teamA.startingXI') as FormArray;
  }
  get teamBStartingXI(): FormArray {
    return this.matchForm.get('teamB.startingXI') as FormArray;
  }

  get teamASubs(): FormArray {
    return this.matchForm.get('teamA.substitutes') as FormArray;
  }
  get teamBSubs(): FormArray {
    return this.matchForm.get('teamB.substitutes') as FormArray;
  }
  // get teamASubstitutes(): FormArray {
  //   return this.matchForm.get('teamA.substitutes') as FormArray;
  // }
  // get teamBSubstitutes(): FormArray {
  //   return this.matchForm.get('teamB.substitutes') as FormArray;
  // }
  private createPlayersArray(count: number): FormGroup[] {
    return Array(count).fill(null).map(() => this.createPlayerFormGroup());
  }

  private createPlayerFormGroup(): FormGroup {
    return this.fb.group({
      number: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      name: ['', Validators.required],
      position: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredAtService.updateState(this.authSevice.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authSevice.logout();
    this.getTeams();
    //this.getLastMatchSheet();
    if (!this.isAddMode) {
      this.title="Mise à jour de la feuille de match";
      this.matchSheetService.show(this.id).subscribe({
        next: (data) => {
          const resData = data["data"] as MatchSheetDetail;
          const teamAData:TeamAData = resData.team_a_data ;
          const teamBData:TeamBData = resData.team_b_data ;
          const playerAData: Player[] = teamAData.startingXI;
          const playerBData: Player[] = teamBData.startingXI;
          const substitutesA: Player[] = teamAData.substitutes;
          const substitutesB: Player[] = teamBData.substitutes;


          //console.log(teamBData);
          this.setPlayersArray(this.teamAStartingXI, playerAData);
          this.setSubstitutesArray(this.teamASubs, substitutesA);
          this.setPlayersArray(this.teamBStartingXI, playerBData);
          this.setSubstitutesArray(this.teamBSubs, substitutesB);

          //console.log(`resData.team_a_data=${resData.team_a_data}`);
          this.matchForm.patchValue({
            match_date:  this.datePipe.transform(resData.match_date,'dd/MM/yyyy HH:mm') ,
            location: resData.location,
            referee: resData.referee,

            teamB: {
              coach_b: resData.coach_b,
              formation_b:resData.formation_b,
              team_b_id: resData.team_b_id,
              color_b: resData.color_b,


            },
            teamA: {
              coach_a: resData.coach_a,
              formation_a:resData.formation_a,
              team_a_id: resData.team_a_id,
              color_a: resData.color_a,

            },


          });
          console.log(`${resData.formation_a}`);
        },
        error: (err) => console.log(err.error)
      });

    }

  }

  setPlayersArray(array: FormArray, players: Player[] | undefined): void {
    array.clear();
    if (!players || !Array.isArray(players)) return; // ✅ protection anti-erreur

    players.forEach(player => {
      array.push(this.fb.group({
        number: [player.number],
        name: [player.name],
        position: [player.position]
      }));
    });
  }
  setSubstitutesArray(array: FormArray, players: Player[] | undefined): void {
    array.clear();
    if (!players || !Array.isArray(players)) return; // ✅ protection anti-erreur

    players.forEach(player => {
      array.push(this.fb.group({
        number: [player.number],
        name: [player.name],
        position: [player.position]
      }));
    });
  }



  get teamAControls(): FormGroup[] {
    return (this.matchForm.get('teamA.startingXI') as FormArray).controls as FormGroup[];
  }
  get teamBControls(): FormGroup[] {
    return (this.matchForm.get('teamB.startingXI') as FormArray).controls as FormGroup[];
  }

  get teamASubstitutes(): FormGroup[] {
    return (this.matchForm.get('teamA.substitutes') as FormArray).controls as FormGroup[];
  }
  get teamBSubstitutes(): FormGroup[] {
    return (this.matchForm.get('teamB.substitutes') as FormArray).controls as FormGroup[];
  }

  getControl(group: FormGroup, controlName: string): FormControl {
    return group.get(controlName) as FormControl;
  }

  getTeams() {
    this.matchSheetService.getTeams().subscribe((teams) => {
      const tempData=teams as unknown as Team;

      this.teams = tempData['data'] as unknown as TeamDetail[]; // Assuming 'data' contains the teams

    });
  }

  getLastMatchSheet() {
    this.matchSheetService.getLastMtachSheet().subscribe((repository) => {
      this.lastMatchSheet = repository.data; // Assuming 'data' contains the MatchSheetDetail
    });
  }

  addSubstitute(team: 'teamA' | 'teamB') {
    const substitutes = this.matchForm.get(`${team}.substitutes`) as FormArray;
    substitutes.push(this.createPlayerFormGroup());
  }
  removeSubstitute(team: 'teamA' | 'teamB', index: number) {
    const substitutes = this.matchForm.get(`${team}.substitutes`) as FormArray;
    substitutes.removeAt(index);
  }

  submit() {
    //console.log('Form submitted:', this.matchForm.value);
    if(this.isAddMode){
      if(this.matchForm.invalid) {
        this.matchForm.markAllAsTouched();
        Object.entries(this.matchForm.controls).forEach(([key, control]) => {
          if (control.invalid) {
            console.warn(`Champ "${key}" est invalide :`, control.errors);
          }
        });
        //console.log('Form errors:', this.matchForm.errors);
        //console.log('Form invalid!', this.matchForm);
        return;
      }
      if (this.matchForm.valid) {
        this.matchForm.patchValue({
          team_a_data: {
            ...this.matchForm.value.teamA,
            startingXI: this.matchForm.value.teamA.startingXI.map((player: any) => ({
              ...player,
              position: player.position
            })),
            substitutes: this.matchForm.value.teamA.substitutes.map((player: any) => ({
              ...player,
              position: player.position
            }))
          },
          team_b_data: {
            ...this.matchForm.value.teamB,
            startingXI: this.matchForm.value.teamB.startingXI.map((player: any) => ({
              ...player,
              position: player.position
            })),
            substitutes: this.matchForm.value.teamB.substitutes.map((player: any) => ({
              ...player,
              position: player.position
            }))
          }
        });
        this.matchSheetService.create(this.matchForm.value)
          .subscribe({
            next: (response) => {
              this.msg=response.message;
              this.router.navigate(['/secured/dashboard/matchsheet/list']);
            },
            error: (error) => {
              this.msg=error.error.message;
              console.error('Error creating match sheet:', error);
              // Gérer l'erreur ici (afficher un message d'erreur, etc.)
            }
          });
        console.log('Form valid:', this.matchForm.value);
        //console.log('Form submitted:', this.matchForm.value);
        // Ajoutez ici votre logique de soumission
      }
    }
    else{
      if(this.matchForm.invalid) {
        this.matchForm.markAllAsTouched();
        Object.entries(this.matchForm.controls).forEach(([key, control]) => {
          if (control.invalid) {
            console.warn(`Champ "${key}" est invalide :`, control.errors);
          }
        });
        //console.log('Form errors:', this.matchForm.errors);
        //console.log('Form invalid!', this.matchForm);
        return;
      }
      if (this.matchForm.valid) {
        this.matchSheetService.patch(this.id,this.matchForm.value).subscribe({
          next: (response) => {
            this.msg=response.message;
            //console.log('Match sheet updated successfully:', response);
            this.router.navigate(['/secured/dashboard/matchsheet/list']);
          },
          error: (error) => {
            console.error('Error updating match sheet:', error);
            // Gérer l'erreur ici (afficher un message d'erreur, etc.)
          }
        })
      }
    }

  }

}
