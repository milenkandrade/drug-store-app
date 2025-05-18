import { Component, inject, OnInit } from '@angular/core';
import { DynamicTableComponent } from "../../components/container/dynamic-table/dynamic-table.component";
import DataHead from '../../models/data-head';
import { DataTable } from '../../models/data-table';
import { RouterService } from '../../services/router.service';
import { AsyncPipe, JsonPipe, } from '@angular/common';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { load, selectProducts, selectSelectedPageable } from '../../store/product/product.state';
import Product from '../../models/product';

@Component({
  selector: 'app-inventory-page',
  imports: [AsyncPipe, DynamicTableComponent],
  template: `
    <div class="page flex flex-col" >
      <h1 class="pb-5" >Inventory Management</h1>
      <app-dynamic-table
        [dataForm]="dataForm((products | async)?.content || [])"
        [actualPage]="((actualParams | async) || 1)"
        [totalPages]="(products | async)?.totalPages || 1"
        [elementsType]="'Products'"
        [lengthTotalData]="(products | async)?.totalElements || 0"
        [numberOfRows]="(products | async)?.size || 0"
        (futurePage)="setFuturePage($event)"
      />
    </div>
  `,
  styles: ``
})
export class InventoryPageComponent implements OnInit {
  head: DataHead[] = [
    /* { name: '', type:'select', key: '' }, */
    { name: 'Register N°', type: 'text', key: 'health_registration_number' },
    { name: 'Product Name', type: 'text', key: 'product_name' },
    { name: 'Cost Price', type: 'text', key: 'cost_price' },
    { name: 'Sale Price', type: 'text', key: 'sale_price' },
    { name: 'Admision Date', type: 'text', key: 'admision_date' },
    { name: 'Expiration Date', type: 'text', key: 'expiration_date' },
    { name: 'Supplier Name', type: 'text', key: 'supplier_name' },
    { name: 'Require', type: 'text', key: 'require' },
    { name: 'Actions', type: 'actions', key: '' }
  ]

  routerService = inject(RouterService)
  actualParams = this.routerService.actualParams
    .pipe(map(p => Number(p?.['id']) || 1 ))

  store = inject(Store)
  products = this.store.select(selectProducts)
  selectPageable = this.store.select(selectSelectedPageable)
  dataForm = (data: Product[]) => new DataTable<Product>({ head: this.head, data })

  setFuturePage(page: number) {
    this.routerService.navigateTo([`/inventory/${page}`])
  }


  constructor() {

  }

  ngOnInit() {
    this.store.dispatch(load())
  }

}
