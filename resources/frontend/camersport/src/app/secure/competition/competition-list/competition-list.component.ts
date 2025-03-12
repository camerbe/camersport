import {Component, OnInit} from '@angular/core';
import {Categorie} from "../../../share/models/categorie";
import {Competition, Competitions} from "../../../share/models/competition";
import {Router} from "@angular/router";
import {CompetitionService} from "../../../share/services/competition/competition.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrl: './competition-list.component.css'
})
export class CompetitionListComponent implements OnInit{
  competitions: Competition[]=[];
  title!: string;

  constructor(
    private competitionService:CompetitionService,
    private router:Router
  ) {
  }

  private getAll(){
    return this.competitionService.getAll()
      .subscribe({
        next:(res)=>{
          // @ts-ignore
          this.competitions=res['data'];
          // @ts-ignore
          this.title=res.message
        }
      })

  }
  ngOnInit(): void {
    this.getAll()
  }


  deleteCompetition(id: number) {
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
      text: "De vouloir supprimer cette compétition !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler ',
      reverseButtons: true
    }).then((result)=>{
      if(result.isConfirmed){
        this.competitionService.delete(id)
          .subscribe({
            next:()=>{
              // @ts-ignore
              this.competitions=this.competitions.filter((a:Competition)=>a.id!=id);
              this.getAll();
            },
            error:(err)=>console.log(err)
          })
      }
      else if(result.dismiss===Swal.DismissReason.cancel){

      }
    })
    this.router.navigate(['/dashboard/competition/list'])
  }
}
