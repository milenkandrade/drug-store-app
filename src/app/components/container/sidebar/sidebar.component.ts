import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { HomeComponent } from '../../icons/home/home.component';
import { DocumentComponent } from '../../icons/document/document.component';
import { PackageComponent } from '../../icons/package/package.component';
import { ChartComponent } from '../../icons/chart/chart.component';
import { AlertComponent } from '../../icons/alert/alert.component';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { ClipboardComponent } from "../../icons/clipboard/clipboard.component";
import { MenuComponent } from "../../icons/menu/menu.component";
import { PlatformService } from '../../../services/platform.service';
import { RouterLink } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgComponentOutlet,
    ClipboardComponent,
    MenuComponent,
    RouterLink,
    AsyncPipe
],
  template: `
    @if(isOpen()) {
      <div class="fixed inset-0 z-10 bg-black/50 opacity-50 max-w-360 mx-auto "
        (click)="changeIsOpen()" >
      </div>
    }

    <div class="flex pt-2 py-2 pl-2 px-2 w-full fixed z-20 max-w-65
      gap-1 {{ isOpen() ? 'border-b-1 border-r-1': ''  }} margin-1 border-neutral-content " >
      @if(isOpen()) {
        <div class="flex justify-center items-center btn btn-ghost ">
          <icon-clipboard class="text-primary " [classes]="'size-6'" />
          <span class="text-2xl" >PharmApp</span>
        </div>
        <icon-menu class="btn p-3 ml-1 " (click)="changeIsOpen()" />
      }

    </div>

    <div class="fixed z-11 p-2" >
      <icon-menu class="btn p-3 ml-1 " (click)="changeIsOpen()" />
    </div>

    @if(isOpen()) {
      <aside class="w-full flex-col border-r-1 h-full max-w-65 fixed z-15 pt-15
        border-neutral-content transition-transform duration-300 ease-in-out
        {{ isOpen() && (isMobile | async) ? 'fixed':'flex' }}  bg-base-100 " >
        <div class="flex flex-col pt-2 gap-2 pl-2 pr-2" >
          @for(icon of icons; track icon.id) {
            <a class="flex gap-2 btn-wide btn btn-ghost justify-normal
              hover:btn-active btn-primary  "
                [routerLink]="icon.link"
                (click)="changeIsOpenAndMobile()"  >
              @if(isOpen()) {
                <ng-container *ngComponentOutlet="icon.image" />
                <span>{{icon.name}}</span>
              }
            </a>
          }
        </div>
      </aside>
    }
  `,
  styles: ``
})
export class SidebarComponent implements OnInit, OnDestroy {
  icons = [
    { id: 1, name: 'Dashboard', image: HomeComponent, link: '/dashboard' },
    { id: 2, name: 'Entries', image: DocumentComponent, link: '/entries' },
    { id: 3, name: 'Inventory', image: PackageComponent, link: '/inventory/1' },
    { id: 4, name: 'Sales', image: ChartComponent, link: '/sales' },
    { id: 5, name: 'Alerts', image: AlertComponent, link: '/alerts/1' },
  ]
  destroy = new Subject<void>()
  isOpen = signal(false);
  platformService = inject(PlatformService);
  isMobile = this.platformService.isMobile$.pipe(takeUntil(this.destroy))

  changeIsOpen() {
    this.isOpen.set(!this.isOpen())
  }

  changeIsOpenAndMobile() {
    return this.isMobile.pipe(map( v => v && this.isOpen() && this.isOpen.set(false)))
  }

  shouldOpenSidebar() {
    return this.isMobile.pipe(map( v => !v && this.isOpen()))
  }

  ngOnInit(): void {
    this.isOpen.set(false);
    this.isMobile.subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
