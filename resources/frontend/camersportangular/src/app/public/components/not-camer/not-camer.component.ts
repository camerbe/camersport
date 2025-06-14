import { afterRender, Component, Input } from '@angular/core';
import { ArticleDetail } from '../../../core/models/article-detail';

@Component({
  selector: 'app-not-camer',
  templateUrl: './not-camer.component.html',
  styleUrl: './not-camer.component.css'
})
export class NotCamerComponent {
  @Input () notcamer:ArticleDetail[] = [];
  constructor(){
    afterRender(()=>{

    })
  }
}
