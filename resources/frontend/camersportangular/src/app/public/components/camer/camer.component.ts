import { Component, Input } from '@angular/core';
import { ArticleDetail } from '../../../core/models/article-detail';

@Component({
  selector: 'app-camer',
  templateUrl: './camer.component.html',
  styleUrl: './camer.component.css'
})
export class CamerComponent {
  @Input () camerArticles:ArticleDetail[] = [];
  @Input () titre!:string;
}
