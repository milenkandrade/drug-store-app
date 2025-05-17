import { Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { HomeComponent } from '../../icons/home/home.component';
import { DocumentComponent } from '../../icons/document/document.component';
import { PackageComponent } from '../../icons/package/package.component';
import { ChartComponent } from '../../icons/chart/chart.component';
import { AlertComponent } from '../../icons/alert/alert.component';
import { NgComponentOutlet } from '@angular/common';
import { ClipboardComponent } from "../../icons/clipboard/clipboard.component";
import { MenuComponent } from "../../icons/menu/menu.component";
import { PlatformService } from '../../../services/platform.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgComponentOutlet,
    ClipboardComponent,
    MenuComponent,
    RouterLink
],
  template: `
    @if(isMobile() && isOpen()) {
      <div class="fixed inset-0 z-10 bg-black/50 opacity-50 max-w-360 mx-auto "
        (click)="changeIsOpen()" >
      </div>
    }

    <aside class="w-full flex-col border-r-1 h-[100dvh]
      border-neutral-content
      transition-transform duration-300 ease-in-out max-w-65
      {{ isOpen() && isMobile() ? 'fixed':'flex' }} z-20 bg-white " >

      <div class="flex py-2 pl-2 px-2 max-w-full gap-1 border-b-1
          margin-1 border-neutral-content " >
        @if(isOpen()) {
          <div class="flex justify-center items-center btn btn-ghost ">
            <icon-clipboard class="text-primary " [classes]="'size-6'" />
            <span class="text-2xl" >PharmApp</span>
          </div>
        }
        <icon-menu class="btn p-3 " (click)="changeIsOpen()" />
      </div>
      <div class="flex flex-col pt-2 gap-2 pl-2 pr-2" >
        @for(icon of icons; track icon.id) {
          <a class="flex gap-2 btn-wide btn btn-ghost justify-normal
            hover:btn-active btn-primary  " [routerLink]="icon.link" >
            <ng-container *ngComponentOutlet="icon.image" />
            @if(isOpen()) {
              <span>{{icon.name}}</span>
            }
          </a>
        }
      </div>
    </aside>
  `,
  styles: ``
})
export class SidebarComponent implements OnInit, OnChanges {
  icons = [
    { id: 1, name: 'Dashboard', image: HomeComponent, link: '/dashboard' },
    { id: 2, name: 'Entries', image: DocumentComponent, link: '/entries' },
    { id: 3, name: 'Inventory', image: PackageComponent, link: '/inventory' },
    { id: 4, name: 'Sales', image: ChartComponent, link: '/sales' },
    { id: 5, name: 'Alerts', image: AlertComponent, link: '/alerts' },
  ]
  isMobile = signal(false);
  isOpen = signal(false);
  platformService = inject(PlatformService);

  changeIsOpen(){
    this.isOpen.set(!this.isOpen())
  }

  changeIsMobile() {
    if(this.platformService.matchMediaQuery(1024)){
      this.isMobile.set(true)
    } else {
      this.isMobile.set(false)
    }
  }

  shouldOpenSidebar() {
    return this.isOpen() && !this.isMobile()
  }

  ngOnInit(): void {
    this.changeIsMobile()
    if(!this.isMobile()) {
      this.isOpen.set(true)
    }
    if(this.platformService.isBrowser) {
      window.addEventListener('resize', this.changeIsMobile.bind(this));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeIsMobile()
  }

}
