import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaiterMainComponent } from './waiter-main/waiter-main.component';
import { TablesMainComponent } from './tables/tables-main/tables-main.component';
import { ReservationsMainComponent } from './reservations/reservations-main/reservations-main.component';
import { TableComponent } from './table-service/table/table.component';

const routes: Routes = [
  {
    path: '',
    component: WaiterMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'tables',
        pathMatch: 'full'
      },
      {
        path: 'tables',
        component: TablesMainComponent,
      },
      {
        path: 'reservations',
        component: ReservationsMainComponent,
      },
      {
        path: 'table/:id',
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
