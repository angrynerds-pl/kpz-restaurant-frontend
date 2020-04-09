import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
  {
    path: 'cook',
    loadChildren: () => import('./modules/cook/cook.module').then(m => m.CookModule)
  },
  {
    path: 'waiter',
    loadChildren: () => import('./modules/waiter/waiter.module').then(m => m.WaiterModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
