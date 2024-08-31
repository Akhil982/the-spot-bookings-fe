import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() { }

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }

  load500ms(){
    this.loadingSubject.next(true);
    setTimeout(() => {
      this.loadingSubject.next(false);
    }, 500);
  }
}
