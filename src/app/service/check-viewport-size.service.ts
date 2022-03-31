import { HostListener, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckViewportSizeService implements OnDestroy {
  public isMobile$ = new BehaviorSubject(false);

  private resizeObservable$: Observable<any>;
  private resizeSubscription$: Subscription;

  constructor() {
    this.isMobile$.next(window.innerWidth < 768);
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      if (evt.target.innerWidth < 768) this.isMobile$.next(true);
      else this.isMobile$.next(false);
    });
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }
}
