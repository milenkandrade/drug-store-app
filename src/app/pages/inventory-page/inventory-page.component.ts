import { Component } from '@angular/core';
import { DynamicTableComponent } from "../../components/container/dynamic-table/dynamic-table.component";
import DataHead from '../../models/data-head';
import Person from '../../models/person';
import { DataForm } from '../../models/data-form';

@Component({
  selector: 'app-inventory-page',
  imports: [DynamicTableComponent],
  template: `
    <div class="page flex flex-col" >
      <h1 class="pb-5" >Inventory Management</h1>
      <app-dynamic-table [dataForm]="dataForm" />
    </div>

  `,
  styles: ``
})
export class InventoryPageComponent {
  head: DataHead[] = [
    { name: '', type:'select', key: '' },
    { name: 'Name', type: 'text', key: 'name' },
    { name: 'Job', type: 'text', key: 'job' },
    { name: 'Favorite Color', type: 'text', key: 'favoriteColor' },
    { name: 'Actions', type: 'actions', key: '' }
  ]
  data: Person[] = [
    { name: 'Cy Ganderton', job: 'Quality Control Specialist', favoriteColor: 'Blue' },
    { name: 'Hart Hagerty', job: 'Desktop Support Technician', favoriteColor: 'Purple' },
    { name: 'Brice Swyre', job: 'Tax Accountant', favoriteColor: 'Red' },
  ]
  dataForm = new DataForm<Person>({ head: this.head, data: this.data })
}
