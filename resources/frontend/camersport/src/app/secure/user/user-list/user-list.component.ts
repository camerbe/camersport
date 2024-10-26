import {Component, OnInit} from '@angular/core';
import {RedacteurService} from "../../../share/services/redacteur/redacteur.service";
import {Administrateur, Redacteur} from "../../../share/models/redacteur";
import Swal from "sweetalert2"
import {Router} from "@angular/router";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  administrators:Redacteur[]=[]
  title!:string
  constructor(
    private redacteurService:RedacteurService,
    private router:Router
  ) { }

  private getAll(){
    // @ts-ignore
    // @ts-ignore
    return this.redacteurService.getAll()
      .subscribe({
        next:(res)=>{
          // @ts-ignore
          this.administrators=res['data']
          // @ts-ignore
          this.title=res.message
          //console.log(`${this.administrators}`)
        }

      });
  }

  ngOnInit(): void {
    this.getAll()
  }


  deleteUser(id: number) {
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
      text: "De vouloir supprimer cet administrateur !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler ',
      reverseButtons: true
    }).then((result)=>{
      if(result.isConfirmed){
        this.redacteurService.delete(id)
          .subscribe({
            next:()=>{
              // @ts-ignore
              this.administrators=this.administrators.filter((a:Redacteur)=>a.id!=id);
              this.getAll();
            },
            error:(err)=>console.log(err)
          })
      }
      else if(result.dismiss===Swal.DismissReason.cancel){

      }
    })
    this.router.navigate(['/dashboard/user/list'])
  }

}
