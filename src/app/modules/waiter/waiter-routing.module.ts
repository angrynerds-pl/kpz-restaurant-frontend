import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaiterMainComponent } from './waiter-main/waiter-main.component';
import { TablesMainComponent } from './tables/tables-main/tables-main.component';
import { ReservationsMainComponent } from './reservations/reservations-main/reservations-main.component';
import { TableComponent } from './table-service/table/table.component';
import { WaiterGuard } from 'src/app/guards/waiter.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [WaiterGuard],
    component: WaiterMainComponent,
    children: [
      {
        path: '',
        canActivate: [WaiterGuard],
        redirectTo: 'tables',
        pathMatch: 'full'
      },
      {
        path: 'tables',
        canActivate: [WaiterGuard],
        component: TablesMainComponent,
      },
      {
        path: 'reservations',
        canActivate: [WaiterGuard],
        component: ReservationsMainComponent,
      },
      {
        path: 'table/:id',
        canActivate: [WaiterGuard],
        component: TableComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaiterRoutingModule { }
