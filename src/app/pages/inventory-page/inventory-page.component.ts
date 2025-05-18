import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DynamicTableComponent } from "../../components/container/dynamic-table/dynamic-table.component";
import DataHead from '../../models/data-head';
import { DataTable } from '../../models/data-table';
import { RouterService } from '../../services/router.service';
import { AsyncPipe, } from '@angular/common';
import { combineLatest,map, Subject, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { load, selectProducts, selectSelectedPageable, setSelectedPageable } from '../../store/product/product.state';
import Product from '../../models/product';
import { PlatformService } from '../../services/platform.service';
import { AddComponent } from "../../components/icons/add/add.component";
import { SearchInputComponent } from "../../components/pure/search-input/search-input.component";
import { FilterInputComponent } from "../../components/pure/filter-input/filter-input.component";
import FilterTable from '../../models/filter-table';
import { CalendarComponent } from "../../components/icons/calendar/calendar.component";

@Component({
  selector: 'app-inventory-page',
  imports: [AsyncPipe, DynamicTableComponent, AddComponent, SearchInputComponent, FilterInputComponent, CalendarComponent],
  template: `
    <div class="page flex flex-col" >
      <div class="flex flex-col md:flex-row justify-between pb-10 md:pb-0 gap-5 " >
        <div class="flex flex-col pb-5" >
          <h1 class="text-3xl font-bold tracking-tight" >Inventory Management</h1>
          <p className="text-muted-foreground text-balance ">
            Manage your products, stock levels, and suppliers
          </p>
        </div>
        <div class="btn btn-md btn-primary w-40 py-5" >
          <icon-add /><span>Add Product</span>
        </div>
      </div>
      <div class="flex flex-col md:flex-row pb-10 gap-5 " >
        <app-search-input />
        <app-filter-input [options]="filtersA" />
        <app-filter-input [options]="filtersB" />
        <div class="btn active:btn-primary shrink" ><icon-calendar /></div>
      </div>
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
export class InventoryPageComponent implements OnInit,OnDestroy {
  head: DataHead[] = [
    /* { name: '', type:'select', key: '' }, */
    /* { name: 'Register N°', type: 'text', key: 'health_registration_number' }, */
    { name: 'Product Name', type: 'text', key: 'product_name' },
    { name: 'Cost Price', type: 'text', key: 'cost_price' },
    { name: 'Sale Price', type: 'text', key: 'sale_price' },
    { name: 'Admision Date', type: 'date', key: 'admision_date' },
    { name: 'Expiration Date', type: 'date', key: 'expiration_date' },
    { name: 'Supplier Name', type: 'text', key: 'supplier_name' },
    { name: 'Require', type: 'text', key: 'require' },
    { name: 'Actions', type: 'actions', key: '' }
  ]
  destroy = new Subject<void>()
  routerService = inject(RouterService)
  actualParams = this.routerService.actualParams
    .pipe(takeUntil(this.destroy), map(p => Number(p?.['id']) || 1 ))
  store = inject(Store)
  platformService = inject(PlatformService)
  isMobile = this.platformService.isMobile$
  products = this.store.select(selectProducts)
  selectPageable = this.store.select(selectSelectedPageable)
  dataForm = (data: Product[]) => new DataTable<Product>({ head: this.head, data })
  filtersA: FilterTable[] = [
    { name: 'Filter', key: '' },
    { name: 'All types', key: '' },
    { name: 'Over the counter', key: '' },
    { name: 'Prescription', key: '' },
  ]
  filtersB: FilterTable[] = [
    { name: 'Supplier', key: '' },
    { name: 'Company A', key: '' },
    { name: 'Company B', key: '' },
    { name: 'Company C', key: '' },
  ]

  setFuturePage(page: number) {
    this.routerService.navigateTo([`/inventory/${page}`])
  }

  constructor() {}

  ngOnInit(): void {
    combineLatest([this.actualParams, this.isMobile])
      .pipe(
        takeUntil(this.destroy),
        tap(([pageNumber, isMobile]) => {
          this.store.dispatch(setSelectedPageable({
            pageable: { size: isMobile ? 8 : 5, number: pageNumber }
          }));
        }),
        tap(() => this.store.dispatch(load()))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
