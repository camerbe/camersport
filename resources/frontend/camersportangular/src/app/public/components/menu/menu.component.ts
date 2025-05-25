import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
items: MenuItem[]=[
    {
      label: 'Accueil',
      routerLink: ['/accueil'],
      routerLinkActive: "text-rose-500 hover:text-rose-500",
      routerLinkActiveOptions: { exact: true },
      styleClass:"text-white hover:text-yellow-300 transition-colors uppercase",
      icon: 'pi pi-home'

    },
    {
      label: 'Actualités',
      routerLink: ['/news'],
      routerLinkActive: "text-rose-500 hover:text-rose-500",
      routerLinkActiveOptions: { exact: true },
      styleClass:"text-white hover:text-yellow-300 transition-colors uppercase",
      icon: 'pi pi-star'
    },
    {
      label: 'Lions Indomptables',
      routerLink: ['/lions-indomptables'],
      routerLinkActive: "text-rose-500 hover:text-rose-500",
      routerLinkActiveOptions: { exact: true },
      styleClass:"text-white hover:text-yellow-300 transition-colors uppercase",
      icon: 'pi pi-circle'
    },
    {
      label: 'Live',
      routerLink: ['/live'],
      routerLinkActive: "text-rose-500 hover:text-rose-500",
      routerLinkActiveOptions: { exact: true },
      styleClass:"text-white hover:text-yellow-300 transition-colors uppercase",
      icon: 'pi pi-play'
    }

  ];



}
