import { Component, inject, OnInit } from '@angular/core';
import { TeamDetail } from '../../../../core/models/team-detail';
import { Team } from '../../../../core/models/team';
import { TeamService } from '../../../../services/team.service';
import { ExpiredAtService } from '../../../../services/expired-at.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css'
})
export class TeamListComponent implements OnInit {

  title:string="Liste des équipes";
  isExpired!:boolean;
  link:string="/secured/dashboard/team";
  label:string="+ Créer";
  teams:TeamDetail[]=[];
  team:Team[]=[];
  teamDetail!:TeamDetail;
  id!:number;
  slug!:string;
  isAddMode!:boolean


  teamService:TeamService=inject(TeamService);
  expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  authService:AuthService=inject(AuthService);
  activedRoute:ActivatedRoute=inject(ActivatedRoute);

  ngOnInit(): void {
    this.id=this.activedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;

    this.expiredAtService.updateState(this.authService.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authService.logout();

    this.teamService.getAll()
    .subscribe({
      next:(data) =>{
        //const userId=Number(localStorage.getItem('userId'));

        const tempData=data as unknown as Team;
        this.teams=tempData["data"] as unknown as TeamDetail[];
        //console.log(this.teams);
        //this.teams=this.teams.filter(equipe=>equipe.id==this.id);
      },
      error:(error)=>console.log(error)
    });
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
              text: "De vouloir supprimer cette équipe !",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Supprimer',
              cancelButtonText: 'Annuler ',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.teamService.delete(id)
                .subscribe({
                  next: () => {
                    this.teams = this.teams.filter((team) => team.id !== id);
                  },
                  error:()=>() => { }
                })
                swalWithTailwindButtons.fire(
                  'Supprimé!',
                  "L' équiê a été supprimée.",
                  'success'
                )
              }
            }
            )
  }

}
