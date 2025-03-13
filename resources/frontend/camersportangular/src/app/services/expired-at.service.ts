import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpiredAtService {

  private stateSubject = new BehaviorSubject<boolean>(false);
  state$ = this.stateSubject.asObservable();
  updateState(newState: boolean) {
    this.stateSubject.next(newState);

  }
}
