import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CompetitionService} from "../../../share/services/competition/competition.service";

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent implements  OnInit{
  frmGroupCompetition!: FormGroup;
  label: string='Ajouter';
  isAddMode!:boolean;
  id!:number;


  constructor(
    private competitionService:CompetitionService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private router:Router
  ) {
      this.frmGroupCompetition=this.fb.group({
        competition:['',[Validators.required]],

      })
  }
  get competition(){
    return this.frmGroupCompetition.get('competition')
  }
  onSubmit() {
    if(this.isAddMode){
      this.competitionService.create(this.frmGroupCompetition.value)
        .subscribe({
          next:(res)=>{
            res.success?
              this.router.navigate(['/dashboard/competition/list']):
              this.router.navigate(['/dashboard/competition/add'])
          }
        })
    }
    else{
      this.competitionService.update(this.id,this.frmGroupCompetition.value)
        .subscribe({
          next:(res)=>{
            res.success?
              this.router.navigate(['/dashboard/competition/list']):
              this.router.navigate(['/dashboard/competition/edit',this.id])
          }
        })
    }
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.isAddMode=!this.id;
    if(!this.isAddMode){
      this.competitionService.show(this.id)
        .subscribe({
          next:(res)=>{
            this.label='Mettre à jour';
            const compet=res['data']
            this.frmGroupCompetition.patchValue({
              competition:compet.competition
            });
          }
        })
    }
  }
}
