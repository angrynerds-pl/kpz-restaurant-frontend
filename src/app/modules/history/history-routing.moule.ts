import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryMainComponent } from './history-main/history-main.component';
import { HistoryGuard } from 'src/app/guards/history.guard';

const routes: Routes = [
  { 
    path: '', 
    canActivate: [HistoryGuard], 
    component: HistoryMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
