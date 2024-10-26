import {Component, signal, Input} from '@angular/core';

@Component({
  selector: 'app-header-list',
  templateUrl: './header-list.component.html',
  styleUrl: './header-list.component.css'
})
export class HeaderListComponent {
  routerLinkSignal = signal<string | undefined>(undefined);
  @Input() label!:string;
  @Input() set routerLink(value: string) {
    this.routerLinkSignal.set(value);
  }
}
