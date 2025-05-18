import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArticleDetail } from '../core/models/article-detail';

@Injectable({
  providedIn: 'root'
})
export class ArticleItemsService {

  private stateSubject = new BehaviorSubject<ArticleDetail[]>([]);
    state$ = this.stateSubject.asObservable();
    updateState(newState: ArticleDetail[]) {
      this.stateSubject.next(newState);
    }
}
