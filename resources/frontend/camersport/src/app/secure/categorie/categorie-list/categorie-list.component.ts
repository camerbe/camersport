import {Component, OnInit} from '@angular/core';
import {CategorieService} from "../../../share/services/categorie/categorie.service";
import {Router} from "@angular/router";
import {Redacteur} from "../../../share/models/redacteur";
import {Categorie, Categories} from "../../../share/models/categorie";
import Swal from "sweetalert2";

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrl: './categorie-list.component.css'
})
export class CategorieListComponent implements OnInit{
  title!: string;
  categories:Categorie[]=[]

  constructor(
    private categorieService:CategorieService,
    private router:Router
  ) {
  }

  private getAll(){
    return this.categorieService.getAll().subscribe({
      next:(res)=>{
        // @ts-ignore
        this.categories=res['data']
        // @ts-ignore
        this.title=res.message
      }
    })
  }
  ngOnInit(): void {
    this.getAll()
  }

  deleteCategorie(id:number) {
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
      text: "De vouloir supprimer cette catégorie !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler ',
      reverseButtons: true
    }).then((result)=>{
      if(result.isConfirmed){
        this.categorieService.delete(id)
          .subscribe({
            next:()=>{
              // @ts-ignore
              this.categories=this.categories.filter((a:Categorie)=>a.id!=id);
              this.getAll();
            },
            error:(err)=>console.log(err)
          })
      }
      else if(result.dismiss===Swal.DismissReason.cancel){

      }
    })
    this.router.navigate(['/dashboard/categorie/list'])
  }
}
