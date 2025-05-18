import { Component, inject, OnInit } from '@angular/core';
import { CompetitionDetail } from '../../../../core/models/competition-detail';
import { CompetitionService } from '../../../../services/competition.service';
import { ExpiredAtService } from '../../../../services/expired-at.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Competition } from '../../../../core/models/competition';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrl: './competition-list.component.css'
})
export class CompetitionListComponent implements OnInit {

  title:string="Liste des compétitions";
  isExpired!:boolean;
  link:string="/secured/dashboard/competition";
  label:string="+ Créer";
  competitions:CompetitionDetail[]=[];
  competition!:CompetitionDetail;
  id!:number;
  isAddMode!:boolean

  competitionService:CompetitionService=inject(CompetitionService);
  expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  authService:AuthService=inject(AuthService);
  activedRoute:ActivatedRoute=inject(ActivatedRoute);

  constructor() { }

  ngOnInit(): void {
    this.id=this.activedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;

    this.expiredAtService.updateState(this.authService.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authService.logout();
    this.competitionService.getAll()
    .subscribe({
      next:(data) =>{
        const tempData=data as unknown as Competition;
        this.competitions=tempData["data"] as unknown as CompetitionDetail[];

      },
      error:(error)=>console.log(error)
    })
  }

  onDelete(id: number) {
    const swalWithTailwindButtons=Swal.mixin({
          customClass:{
            container: 'bg-gray-800',
            popup: 'rounded-lg p-4 shadow-lg',
            title: 'text-2xl font-bold text-gray-600',
            //content: 'text-md text-gray-200',
            confirmButton: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
            cancelButton: 'mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
          },
          buttonsStyling: false
        })
        swalWithTailwindButtons.fire({
          title: 'Êtes-vous sûr?',
          text: "De vouloir supprimer cette compétion !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Supprimer',
          cancelButtonText: 'Annuler ',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.competitionService.delete(id)
            .subscribe({
              next: () => {
                this.competitions = this.competitions.filter((competition) => competition.id !== id);
              },
              error:()=>() => { }
            })
            swalWithTailwindButtons.fire(
              'Supprimé!',
              'La compétition a été supprimée.',
              'success'
            )
          }
        }
        )
  }
}
