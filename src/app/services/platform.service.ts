import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public get isBrowser() {
    return isPlatformBrowser(this.platformId)
  }

  public get isServer() {
    return isPlatformServer(this.platformId)
  }

  public matchMediaQuery(n: number) {
    return this.isBrowser && window.matchMedia(`(max-width: ${n}px)`).matches
  }
}
