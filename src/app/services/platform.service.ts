import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, fromEvent, map, startWith, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService implements OnDestroy {

  private destroy$ = new Subject<void>();
  private mobileBreakpoint = 1024;
  private isMobileSubject = new BehaviorSubject<boolean>(false);

  isMobile$ = this.isMobileSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isBrowser()) {
      this.updateIsMobile();

      fromEvent(window, 'resize').pipe(
        startWith(null),
        map(() => this.checkIsMobile()),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(this.isMobileSubject);
    }
  }

  private checkIsMobile(): boolean {
    return this.isBrowser() && window.matchMedia(`(max-width: ${this.mobileBreakpoint}px)`).matches;
  }

  private updateIsMobile(): void {
    this.isMobileSubject.next(this.checkIsMobile());
  }

  public isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
