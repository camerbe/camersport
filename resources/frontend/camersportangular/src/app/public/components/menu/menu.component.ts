import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @ViewChild('menubar') menubar!: Menubar;
  activeParentItem: any; // Track the parent menu item
  items: MenuItem[] = [
  {
    label: 'Accueil',
    routerLink: ['/accueil'],
    routerLinkActive: "text-rose-500 hover:text-rose-500",
    routerLinkActiveOptions: { exact: true },
    style: { 'color': 'white', 'text-transform': 'uppercase' }
    /*icon: 'pi pi-home'*/
  },
  {
    label: 'Actualités',
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
    /*icon: 'pi pi-angle-down',*/
    styleClass: "text-white hover:text-yellow-300 transition-colors uppercase",
    items: [
      {
        label: 'Mtn Elite One',
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
    /*icon: 'pi pi-angle-down',*/
    //styleClass: "bg-gray-200 text-white hover:text-yellow-300 transition-colors uppercase",
    style: { 'color': 'white', 'text-transform': 'uppercase' },
    items: [
      {
        label: 'Can',
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
    routerLink: ['/live'],
    routerLinkActive: "text-rose-500 hover:text-rose-500",
    routerLinkActiveOptions: { exact: true },
    styleClass: "text-white hover:text-yellow-300 transition-colors uppercase",
    /*icon: 'pi pi-play'*/
  }
];
  

 router:Router = inject(Router);



}
