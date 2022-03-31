/*TODO: check if this service should be put inside loader loagical module*/

/* tslint:disable:typedef */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';


export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  private loaderPlaceholderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  loaderPlaceholderState = this.loaderPlaceholderSubject.asObservable();

  constructor() {
  }

  show() {
    this.loaderSubject.next({show: true});
  }

  hide() {
    this.loaderSubject.next({show: false});
  }

  showPlaceholder() {
    this.loaderPlaceholderSubject.next({show: true});
  }

  hidePlaceholder() {
    this.loaderPlaceholderSubject.next({show: false});
  }
}
