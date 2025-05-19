import { Component, inject } from '@angular/core';
import { AlertComponent } from '../../components/icons/alert/alert.component';
import { DynamicTableComponent } from '../../components/container/dynamic-table/dynamic-table.component';
import { AsyncPipe } from '@angular/common';
import Alert from '../../models/alert';
import { DataTable } from '../../models/data-table';
import DataHead from '../../models/data-head';
import {
  load,
  selectAlerts,
  setSelectedPageable,
} from '../../store/alert/alert.state';
import { Store } from '@ngrx/store';
import { combineLatest, map, Subject, takeUntil, tap } from 'rxjs';
import { RouterService } from '../../services/router.service';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-alerts-page',
  imports: [AlertComponent, DynamicTableComponent, AsyncPipe],
  template: `
    <div class="flex flex-col page">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Expiration Alerts</h1>
        <p className="text-muted-foreground">
          Monitor and manage products that are approaching their expiration
          dates
        </p>
      </div>
      <div class="border border-red-200 w-full rounded-lg shadow-sm">
        <div class="bg-red-50 rounded-t-lg p-6">
          <h3
            class="text-2xl font-semibold text-red-700 flex items-center gap-2"
          >
            <icon-alert />Expiring in 0-1 Week
          </h3>
          <p class="text-sm text-red-600">Inmediate ation required</p>
        </div>
        <div class="p-6 pt-6">
          <div class="rounded-md border border-gray-300">
            <div class="relative w-full overflow-auto">
              <app-dynamic-table
                [dataForm]="dataForm((alerts | async)?.content || [])"
                [actualPage]="(actualParams | async) || 1"
                [totalPages]="(alerts | async)?.totalPages || 1"
                [elementsType]="'Alerts'"
                [lengthTotalData]="(alerts | async)?.totalElements || 0"
                [numberOfRows]="(alerts | async)?.size || 0"
                (futurePage)="setFuturePage($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class AlertsPageComponent {
  head: DataHead[] = [
    { name: 'Product Name', type: 'text', key: 'product_name' },
    { name: 'Stock', type: 'text', key: 'stock' },
    { name: 'Expiration Date', type: 'date', key: 'expiration_date' },
    { name: 'Supplier Name', type: 'text', key: 'supplier_name' },
    { name: 'Actions', type: 'actions', key: '' },
  ];
  destroy = new Subject<void>();
  dataForm = (data: Alert[]) => new DataTable<Alert>({ head: this.head, data });
  store = inject(Store);
  alerts = this.store.select(selectAlerts);
  routerService = inject(RouterService);
  actualParams = this.routerService.actualParams.pipe(
    takeUntil(this.destroy),
    map((p) => Number(p?.['id']) || 1)
  );
  setFuturePage(page: number) {
    this.routerService.navigateTo([`/alerts/${page}`]);
  }

  platformService = inject(PlatformService);
  isMobile = this.platformService.isMobile$;

  ngOnInit(): void {
    combineLatest([this.actualParams, this.isMobile])
      .pipe(
        takeUntil(this.destroy),
        tap(([pageNumber, isMobile]) => {
          this.store.dispatch(
            setSelectedPageable({
              pageable: { size: isMobile ? 8 : 5, number: pageNumber },
            })
          );
        }),
        tap(() => this.store.dispatch(load()))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
