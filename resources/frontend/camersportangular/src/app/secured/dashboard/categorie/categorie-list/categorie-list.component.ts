import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CategorieService } from '../../../../services/categorie.service';
import { ExpiredAtService } from '../../../../services/expired-at.service';
import { AuthService } from '../../../../services/auth.service';
import { CategorieDetail } from '../../../../core/models/categorie-detail';
import { Categorie } from '../../../../core/models/categorie';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrl: './categorie-list.component.css'
})
export class CategorieListComponent implements OnInit {
  title:string="Liste des categories";
  isExpired!:boolean;
  link:string="/secured/dashboard/categorie";
  label:string="+ Créer";
  categories:CategorieDetail[]=[];
  category:Categorie[]=[];
  categorie!:CategorieDetail;
  id!:number;
  isAddMode!:boolean

  // categorieService:CategorieService=inject(CategorieService);
  // expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  // authService:AuthService=inject(AuthService);
  // activedRoute:ActivatedRoute=inject(ActivatedRoute);
  isBrowser: boolean;

  /**
   *
   */
  constructor(
    private categorieService: CategorieService,
    private expiredAtService: ExpiredAtService,
    private authService: AuthService,
    private activedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }
  // Removed duplicate platformId method to resolve identifier conflict

  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.id=this.activedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;

    this.expiredAtService.updateState(this.authService.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authService.logout();
    this.categorieService.getAll()
    .subscribe({
      next:(data) =>{
        const tempData=data as unknown as Categorie;
        this.categories=tempData["data"] as unknown as CategorieDetail[];

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
      text: "De vouloir supprimer cette catégorie !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler ',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categorieService.delete(id)
        .subscribe({
          next: () => {
            this.categories = this.categories.filter((categorie) => categorie.id !== id);
          },
          error:()=>() => { }
        })
        swalWithTailwindButtons.fire(
          'Supprimé!',
          'La catégorie a été supprimée.',
          'success'
        )
      }
    }
    )
  }
  onUpdate(id: number) {

  }
}
