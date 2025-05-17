import { Component } from '@angular/core';
import { HomeComponent } from '../../icons/home/home.component';
import { DocumentComponent } from '../../icons/document/document.component';
import { PackageComponent } from '../../icons/package/package.component';
import { ChartComponent } from '../../icons/chart/chart.component';
import { AlertComponent } from '../../icons/alert/alert.component';
import { NgComponentOutlet } from '@angular/common';
import { ClipboardComponent } from "../../icons/clipboard/clipboard.component";
import { MenuComponent } from "../../icons/menu/menu.component";

@Component({
  selector: 'app-sidebar',
  imports: [
    NgComponentOutlet,
    ClipboardComponent,
    MenuComponent
],
  template: `
    <div class="w-full max-w-60 flex flex-col" >
      <div class="flex" >
        <div class="flex" ><icon-clipboard/> PharmApp</div>
        <icon-menu/>
      </div>
      <div class="flex flex-col" >
        @for(icon of icons; track icon.id) {
          <div class="flex " >
            <ng-container *ngComponentOutlet="icon.image" />
            <span>{{icon.name}}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``
})
export class SidebarComponent {
  icons = [
    { id: 1, name: 'Dashboard', image: HomeComponent },
    { id: 2, name: 'Entries', image: DocumentComponent },
    { id: 3, name: 'Inventory', image: PackageComponent },
    { id: 4, name: 'Sales', image: ChartComponent },
    { id: 5, name: 'Alerts', image: AlertComponent},
  ]
}
