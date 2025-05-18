import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Params, Router } from '@angular/router';
import { PlatformService } from './platform.service';
import { BehaviorSubject, filter, map, merge,
  Observable, shareReplay, Subject, switchMap, takeUntil, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private routeState: BehaviorSubject<string> = new BehaviorSubject<string>('/')
  private routeExtraState: BehaviorSubject<any> = new BehaviorSubject<any>(undefined)
  private routeFragment: BehaviorSubject<string> = new BehaviorSubject<string>('')
  private routeParams: BehaviorSubject<Params> = new BehaviorSubject<Params>({})
  private externalRoutes = new Set(['/', '/sale', '/register', '/login'])
  private loginRoutes = new Set(['/register', '/login'])

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private platformService: PlatformService,
  ) {
    if(this.platformService.isBrowser()) {
      this.listenToRouterEvents()
    }
  }

  public get actualRoute(): Observable<string> {
    return this.routeState.asObservable()
      .pipe(shareReplay(1))
  }

  public get actualExtraState(): Observable<any> {
    return this.routeExtraState.asObservable()
  }

  public get actualFragment(): Observable<string> {
    return this.routeFragment.asObservable()
  }

  public get actualParams(): Observable<Params> {
    return this.routeParams.asObservable()
  }

  private getPathname(value: string): string {
    return value.split('#')[0].split('?')[0]
  }

  public get isInternalRoute(): Observable<boolean> {
    return this.actualRoute.pipe(
      map(value => !this.externalRoutes.has(this.getPathname(value))))
  }

  public get isLoginOrRegisterRoute(): Observable<boolean> {
    return this.actualRoute.pipe(
      map(value => this.loginRoutes.has(this.getPathname(value))))
  }

  private listenToRouterEvents(): void {
    merge(
      // Flujo para NavigationEnd: actualiza la ruta y extrae parámetros
      this.router.events.pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        tap((event: NavigationEnd) =>
          this.routeState.next(this.getPathname(event.urlAfterRedirects))),
        switchMap(() => this.activeRoute.firstChild?.params ?? this.activeRoute.params),
        tap(params => this.routeParams.next(params))
      ),
      // Flujo para NavigationStart: actualiza estado extra y fragmento
      this.router.events.pipe(
        filter((e): e is NavigationStart => e instanceof NavigationStart),
        map(() => this.router.getCurrentNavigation()),
        tap(currentNav => {
          this.routeExtraState.next(currentNav?.extras.state);
          this.routeFragment.next(currentNav?.extractedUrl.fragment ?? '');
        })
      )
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe();
  }

  public navigateTo(commands: string[]): void {
    this.router.navigate(commands)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
