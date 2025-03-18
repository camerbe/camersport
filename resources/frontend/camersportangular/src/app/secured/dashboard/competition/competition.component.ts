import { Component, inject, OnInit } from '@angular/core';
import { CompetitionDetail } from '../../../core/models/competition-detail';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ExpiredAtService } from '../../../services/expired-at.service';
import { CompetitionService } from '../../../services/competition.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Competition } from '../../../core/models/competition';
import { first } from 'rxjs';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent implements OnInit {
  title:string="Ajout competition";
  link:string="/dashboard/competition/list";
  label:string="Liste";
  isExpired!:boolean;
  isAddMode!:boolean;
  id!:number;
  erreur!:string;
  competitions:Competition[]=[];
  frmCompetition!:FormGroup;

  fb:FormBuilder=inject(FormBuilder);
  authSevice:AuthService=inject(AuthService);
  expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  competitionService:CompetitionService=inject(CompetitionService);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);

  constructor() {
    this.frmCompetition=this.fb.group({
      competition:['',Validators.required]
    });
  }

  get competition(){
    return this.frmCompetition.get('competition');
  }

  onSubmit() {
    if(this.isAddMode){
      this.competitionService.create(this.frmCompetition.value)
        .subscribe({
          next:()=>this.router.navigate(['/dashboard/competition/list']),
          error:(error)=>console.log(error)
        });
    }
    else{

      this.competitionService.patch(this.id,this.frmCompetition.value)
        .subscribe({
          next:()=>this.router.navigate(['/dashboard/competition/list'])
        });
    }
  }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredAtService.updateState(this.authSevice.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authSevice.logout();
    if(!this.isAddMode){
          this.title="mise à jour de compétition";

          this.competitionService.show(this.id)
            .pipe(first())
            .subscribe({
              next:data=>{
                const resData=data["data"] as CompetitionDetail
                this.frmCompetition.patchValue(resData);

              },
              error:err=>this.erreur=err.error
            })

        }
  }

}
