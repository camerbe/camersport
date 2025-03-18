import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrl: './button-link.component.css'
})
export class ButtonLinkComponent {
  @Input() link!:string;
  @Input() label!:string;
}
