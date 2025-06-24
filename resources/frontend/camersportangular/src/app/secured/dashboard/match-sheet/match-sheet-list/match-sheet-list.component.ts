import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatchSheetDetail } from '../../../../core/models/match-sheet-detail';
import { MatchSheet } from '../../../../core/models/match-sheet';
import { MatchSheetService } from '../../../../services/match-sheet.service';
import { ExpiredAtService } from '../../../../services/expired-at.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-match-sheet-list',
  templateUrl: './match-sheet-list.component.html',
  styleUrl: './match-sheet-list.component.css'
})
export class MatchSheetListComponent implements OnInit {

  title:string="Liste des feuilles de match";
  isExpired!:boolean;
  link:string="/secured/dashboard/matchsheet";
  label:string="+ Créer";
  matchsheets:MatchSheetDetail[]=[];
  matchsheet:MatchSheet[]=[];
  sigleMatchsheet!:MatchSheetDetail;
  id!:number;
  slug!:string;
  isAddMode!:boolean
  severity!:string;
  msg!:string;
  isBrowser!: boolean;

  // matchSheetService:MatchSheetService=inject(MatchSheetService);
  // expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  // authService:AuthService=inject(AuthService);
  // activedRoute:ActivatedRoute=inject(ActivatedRoute);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private matchSheetService: MatchSheetService,
    private expiredAtService: ExpiredAtService,
    private authService: AuthService,
    private activedRoute: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    // Fetch match sheets from the service
    this.id=this.activedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;

    this.expiredAtService.updateState(this.authService.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authService.logout();
    this.matchSheetService.getAll()
    .subscribe({
      next:(data) =>{
        const userId=Number(localStorage.getItem('userId'));

        const tempData=data as unknown as MatchSheet;
        this.matchsheets=tempData["data"] as unknown as MatchSheetDetail[];
        //console.log(this.articles);

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
              text: "De vouloir supprimer cette feuille de match !",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Supprimer',
              cancelButtonText: 'Annuler ',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.matchSheetService.delete(id)
                .subscribe({
                  next: () => {
                    this.matchsheets = this.matchsheets.filter((matchsheet) => matchsheet.id !== id);
                  },
                  error:()=>() => { }
                })
                swalWithTailwindButtons.fire(
                  'Supprimé!',
                  "La feuille de match a été supprimée.",
                  'success'
                )
              }
            }
            )
  }

}
