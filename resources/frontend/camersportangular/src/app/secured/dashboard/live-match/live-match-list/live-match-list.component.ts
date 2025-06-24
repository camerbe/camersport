import { LiveMatchDetail } from './../../../../core/models/live-match-detail';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LiveMatch } from '../../../../core/models/live-match';
import { LiveMatchService } from '../../../../services/live-match.service';
import { ExpiredAtService } from '../../../../services/expired-at.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-live-match-list',
  templateUrl: './live-match-list.component.html',
  styleUrl: './live-match-list.component.css'
})
export class LiveMatchListComponent implements OnInit {
  title: string = "Liste des matchs en direct";
  isExpired!: boolean;
  link: string = "/secured/dashboard/live";
  label: string = "+ Créer";
  liveMatchs: LiveMatchDetail[] = [];
  // matchSheet!: MatchSheet;
  // slug!: string;
  id!: number;
  isAddMode!: boolean;
  severity!: string;
  msg!: string;

  // liveMatchService: LiveMatchService = inject(LiveMatchService);
  // expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  // authService:AuthService=inject(AuthService);
  // activedRoute:ActivatedRoute=inject(ActivatedRoute);

  isBrowser!: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private liveMatchService: LiveMatchService,
    private expiredAtService: ExpiredAtService,
    private authService: AuthService,
    private activedRoute: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.id=this.activedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;

    this.expiredAtService.updateState(this.authService.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authService.logout();
    // Fetch live matches from the service
    this.liveMatchService.getAll()
    .subscribe({
      next: (data) => {
       // const userId = Number(localStorage.getItem('userId'));
        const tempData = data as unknown as LiveMatch;
        this.liveMatchs = tempData["data"] as unknown as LiveMatchDetail[];
        //console.log(this.liveMatchs);
        //console.log(tempData);
      },
      error: (error) => console.log(error)
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
              text: "De vouloir supprimer cet évènement du live!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Supprimer',
                  cancelButtonText: 'Annuler ',
                  reverseButtons: true
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.liveMatchService.delete(id)
                    .subscribe({
                      next: () => {
                        this.liveMatchs = this.liveMatchs.filter((liveMatch) => liveMatch.id !== id);
                      },
                      error:()=>() => { }
                    })
                    swalWithTailwindButtons.fire(
                      'Supprimé!',
                      "L'évènement du live a été supprimé.",
                      'success'
                    )
                  }
                }
                )
  }
}
