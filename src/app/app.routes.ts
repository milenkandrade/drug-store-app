import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { EntriesPageComponent } from './pages/entries-page/entries-page.component';
import { AlertsPageComponent } from './pages/alerts-page/alerts-page.component';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { SalesPageComponent } from './pages/sales-page/sales-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '', component: HomePageComponent
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
    path:'inventory', component: InventoryPageComponent
  },
  {
    path:'sales', component: SalesPageComponent
  },
  {
    path: "**", redirectTo: '/'
  }
];
