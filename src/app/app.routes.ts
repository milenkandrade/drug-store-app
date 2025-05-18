import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { EntriesPageComponent } from './pages/entries-page/entries-page.component';
import { AlertsPageComponent } from './pages/alerts-page/alerts-page.component';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { SalesPageComponent } from './pages/sales-page/sales-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '', redirectTo: '/inventory/1', pathMatch: 'full'
  },
  {
    path:'dashboard', component: DashboardPageComponent
  },
  {
    path:'entries', component: EntriesPageComponent
  },
  {
    path:'alerts', component: AlertsPageComponent
  },
  {
    path:'inventory/:id', component: InventoryPageComponent
  },
  {
    path:'sales', component: SalesPageComponent
  },
  {
    path: "**", redirectTo: '/'
  }
];
