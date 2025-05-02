import { Component, inject, OnInit } from '@angular/core';
import { Team } from '../../../core/models/team';
import { MatchSheetDetail } from '../../../core/models/match-sheet-detail';
import { MatchSheetService } from '../../../services/match-sheet.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ExpiredAtService } from '../../../services/expired-at.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamDetail } from '../../../core/models/team-detail';

@Component({
  selector: 'app-match-sheet',
  templateUrl: './match-sheet.component.html',
  styleUrl: './match-sheet.component.css'
})
export class MatchSheetComponent implements OnInit {
  matchSheet: any;
  teams: TeamDetail[] = [];
  id!: number;
  isAddMode!: boolean;
  title:string="Ajout feuille de match";
  link:string="/secured/dashboard/matchsheet/list";
  label:string="Liste";
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

  constructor() {
    this.matchForm = this.fb.group({

      match_date: ['', Validators.required],
      location: ['', Validators.required],
      referee: ['', Validators.required],
      teamA:this.fb.group({
        team_a_id : ['', Validators.required],
        color_a : ['', Validators.required],
        coach_a: ['', Validators.required],
        formation_a: ['', Validators.required],
        startingXI: this.fb.array(this.createPlayersArray(11)),
        substitutes: this.fb.array(this.createPlayersArray(5))
      }),
      //teamA: this.createTeamFormGroup(),
      teamB:this.fb.group({
        team_b_id : ['', Validators.required],
        color_b : ['', Validators.required],
        coach_b: ['', Validators.required],
        formation_b: ['', Validators.required],
        startingXI: this.fb.array(this.createPlayersArray(11)),
        substitutes: this.fb.array(this.createPlayersArray(5))
      }),
      team_a_data: (teamA: any) => teamA,
      team_b_data: (teamB: any) => teamB

    });
  }

  // private createTeamFormGroup(): FormGroup {
  //     return this.fb.group({
  //       team_a_id : ['', Validators.required],
  //       team_b_id : ['', Validators.required],
  //       color_a : ['', Validators.required],
  //       color_b : ['', Validators.required],
  //       coach_a: ['', Validators.required],
  //       coach_b: ['', Validators.required],
  //       formation_a: ['', Validators.required],
  //       formation_b: ['', Validators.required],
  //       startingXI: this.fb.array(this.createPlayersArray(11)),
  //       substitutes: this.fb.array(this.createPlayersArray(5))
  //     });
  // }
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
      this.matchSheetService.create(this.matchForm.value).subscribe(
        (response) => {
          console.log('Match sheet created successfully:', response);
          this.router.navigate(['/secured/dashboard/matchsheet/list']);
        },
        (error) => {
          console.error('Error creating match sheet:', error);
          // Gérer l'erreur ici (afficher un message d'erreur, etc.)
        }
      );
      console.log('Form valid:', this.matchForm.value);
      //console.log('Form submitted:', this.matchForm.value);
      // Ajoutez ici votre logique de soumission
    }
  }

}
