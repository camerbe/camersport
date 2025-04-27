import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrl: './live.component.css'
})
export class LiveComponent implements OnInit {
  matchForm!: FormGroup;
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
  constructor() {
    this.matchForm = this.fb.group({
      teamA: this.createTeamFormGroup(),
      teamB: this.createTeamFormGroup()
    });
   }

   private createTeamFormGroup(): FormGroup {
    return this.fb.group({
      coach: ['', Validators.required],
      startingXI: this.fb.array(this.createPlayersArray(11)),
      substitutes: this.fb.array(this.createPlayersArray(5))
    });
  }

  private createPlayersArray(count: number): FormGroup[] {
    return Array(count).fill(null).map(() => this.createPlayerFormGroup());
  }

  private createPlayerFormGroup(): FormGroup {
    return this.fb.group({
      number: [null, [Validators.required, Validators.min(1), Validators.max(99)]], // Changé à null
      name: ['', Validators.required],
      position: ['', Validators.required],

    });
  }
  get coachA(): FormControl {
    return this.matchForm.get('teamA.coach') as FormControl;
  }
  getControl(group: FormGroup, controlName: string): FormControl {
    return group.get(controlName) as FormControl;
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
  getFormControl(path: string): FormControl {
    return this.matchForm.get(path) as FormControl;
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
    if (this.matchForm.valid) {
      console.log('Form submitted:', this.matchForm.value);
      // Ajoutez ici votre logique de soumission
    }
  }
  ngOnInit(): void {
    // Initialisation ou logique supplémentaire si nécessaire
  }

}
