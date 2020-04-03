import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaiterMainComponent } from './waiter-main/waiter-main.component';
import { TablesComponent } from './tables/tables.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { TableComponent } from './table/table.component';

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
        component: TablesComponent,
      },
      {
        path: 'reservations',
        component: ReservationsComponent,
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
