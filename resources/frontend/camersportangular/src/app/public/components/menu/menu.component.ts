import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, afterRender, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, NgZone, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements AfterViewInit ,OnInit{

  // private zone=inject(NgZone);
  // router:Router = inject(Router);
  isBrowser!: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    afterNextRender(()=>{
       this.items=this.itemMenu;
    })


  }

  //@ViewChild('menubar') menubar!: Menubar;
  activeParentItem: any; // Track the parent menu item
  searchQuery:string='';
  itemMenu: MenuItem[] = [
  {
      label: 'Accueil',
      routerLink: ['/accueil'],
      rel: 'nofollow',
      routerLinkActive: "text-rose-500 hover:text-rose-500",
      routerLinkActiveOptions: { exact: true },
      style: { 'color': 'white', 'text-transform': 'uppercase' }
      /*icon: 'pi pi-home'*/
    },
    {
      label: 'Actualités',
      rel: 'nofollow',
      routerLink: ['/competitions/actualite'],
      routerLinkActive: "text-rose-500 hover:text-rose-500",
      routerLinkActiveOptions: { exact: true },
      //styleClass: "text-white hover:text-yellow-300 transition-colors uppercase ",
      style: { 'color': 'white', 'text-transform': 'uppercase' },
      command: (event) => {
        this.activeParentItem = event.item && event.item['parent'] ? event.item['parent'] : null;  if(event.item) {
          //event.item.skipLocationChange = true;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/competitions','actualite']);
          });
        };
      },
      /*icon: 'pi pi-star'*/
    },
    {
      label: 'Championnat',
      rel: 'nofollow',
      /*icon: 'pi pi-angle-down',*/
      styleClass: "text-white hover:text-yellow-300 transition-colors uppercase",
      items: [
        {
          label: 'Mtn Elite One',
          rel: 'nofollow',
          routerLink: ['/lions-indomptables'],
          routerLinkActive: "text-rose-500 hover:text-rose-500",
          routerLinkActiveOptions: { exact: true },
          command: (event) => {
            this.activeParentItem = event.item && event.item['parent'] ? event.item['parent'] : null;  if(event.item) {
              //event.item.skipLocationChange = true;
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/competitions', 'mtn-elite-one']);
              });
            };
          },
          //icon: 'pi pi-flag',
          //styleClass: "text-white hover:text-yellow-300 transition-colors uppercase whitespace-nowrap"
          style: { 'color': 'white', 'text-transform': 'uppercase' },
        },
        {
          label: 'Mtn Elite Two',
          rel: 'nofollow',
          routerLink: ['/competitions/lions-en-club'],
          routerLinkActive: "text-rose-500 hover:text-rose-500",
          routerLinkActiveOptions: { exact: true },
          command: (event) => {
            this.activeParentItem = event.item && event.item['parent'] ? event.item['parent'] : null; if(event.item) {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/competitions', 'mtn-elite-two']);
              });
            };
          },
          //icon: 'pi pi-briefcase',
          //styleClass: "text-green-800 hover:text-yellow-300 transition-colors uppercase"
          style: { 'color': 'white', 'text-transform': 'uppercase' },
        }
      ]
    },
    {
      label: 'Lions',
      /*icon: 'pi pi-angle-down',*/
      styleClass: "text-white hover:text-yellow-300 transition-colors uppercase",
      items: [
        {
          label: 'Lions Indomptables',
          rel: 'nofollow',
          routerLink: ['/lions-indomptables'],
          routerLinkActive: "text-rose-500 hover:text-rose-500",
          routerLinkActiveOptions: { exact: true },
          command: (event) => {
            this.activeParentItem = event.item && event.item['parent'] ? event.item['parent'] : null;  if(event.item) {
              //event.item.skipLocationChange = true;
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/lions-indomptables']);
              });
            };
          },
          //icon: 'pi pi-flag',
          //styleClass: "text-white hover:text-yellow-300 transition-colors uppercase whitespace-nowrap"
          style: { 'color': 'white', 'text-transform': 'uppercase' },
        },
        {
          label: 'Lions en Club',
          rel: 'nofollow',
          routerLink: ['/competitions/lions-en-club'],
          routerLinkActive: "text-rose-500 hover:text-rose-500",
          routerLinkActiveOptions: { exact: true },
          command: (event) => {
            this.activeParentItem = event.item && event.item['parent'] ? event.item['parent'] : null; if(event.item) {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/competitions', 'lions-en-club']);
              });
            };
          },
          //icon: 'pi pi-briefcase',
          //styleClass: "text-green-800 hover:text-yellow-300 transition-colors uppercase"
          style: { 'color': 'white', 'text-transform': 'uppercase' },
        }
      ]
    },
    {
      label: 'Afrique',
      rel: 'nofollow',
      /*icon: 'pi pi-angle-down',*/
      //styleClass: "bg-gray-200 text-white hover:text-yellow-300 transition-colors uppercase",
      style: { 'color': 'white', 'text-transform': 'uppercase' },
      items: [
        {
          label: 'Can',
          rel: 'nofollow',
          routerLink: ['/competitions/can'],
          routerLinkActive: "text-rose-500 hover:text-rose-500",
          routerLinkActiveOptions: { exact: true },

          command: (event) => {
            this.activeParentItem = event.item && event.item['parent'] ? event.item['parent'] : null; if(event.item) {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/competitions', 'can']);
              });
            };
          },
          //icon: 'pi pi-flag',
          //styleClass: "bg-gray-200 text-white hover:text-yellow-300 transition-colors uppercase"
          style: { 'color': 'white', 'text-transform': 'uppercase' },
        },
        {
          label: 'Caf Champions League',
          rel: 'nofollow',
          routerLink: ['/competitions','caf-champions-league'],
          routerLinkActive: "text-rose-500 hover:text-rose-500",
          routerLinkActiveOptions: { exact: true },
          command: (event) => {
            this.activeParentItem = event.item && event.item['parent'] ? event.item['parent'] : null;  if(event.item) {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/competitions', 'caf-champions-league']);
              });
            }
          },
          style: { 'color': 'white', 'text-transform': 'uppercase' },
        },
        {
          label: 'Chan',
          rel: 'nofollow',
          routerLink: ['/competitions','chan'],
          routerLinkActive: "text-rose-500 hover:text-rose-500",
          routerLinkActiveOptions: { exact: true },
          command: (event) => {
            this.activeParentItem = event.item && event.item['parent'] ? event.item['parent'] : null;  if(event.item) {
              //event.item.skipLocationChange = true;
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/competitions', 'chan']);
              });
            };
          },
          //icon: 'pi pi-briefcase',
          //styleClass: "text-white hover:text-yellow-300 transition-colors uppercase"
          style: { 'color': 'white', 'text-transform': 'uppercase' },
        }
      ]
    },
    {
      label: 'Live',
      rel: 'nofollow',
      routerLink: ['/live'],
      routerLinkActive: "text-rose-500 hover:text-rose-500",
      routerLinkActiveOptions: { exact: true },
      styleClass: "text-white hover:text-yellow-300 transition-colors uppercase",
      /*icon: 'pi pi-play'*/
    }

  ];
  items: MenuItem[] = [];



  /**
   *
   */

  ngOnInit(): void {
    // if (isPlatformBrowser(this.platformId)){
    //   this.items=this.itemMenu;
    // }
  }
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    // this.zone.runOutsideAngular(() => {
    //   this.router.events.subscribe((event) => {
    //     if (event instanceof NavigationEnd) {
    //       this.zone.run(() => {
    //         // Handle the event in the Angular zone
    //       });
    //     }
    //   });
    // });
    //this.items=this.itemMenu;

      this.cdr.detectChanges();

  }
  submitSearch() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.searchQuery) {
        const url = `https://www.google.com/search?q=${encodeURIComponent(this.searchQuery)}&sitesearch=camer-sport.com`;
        window.open(url, '_blank');
      }
    }

  }





}
