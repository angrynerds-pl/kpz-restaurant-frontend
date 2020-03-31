import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerMainComponent} from './manager-main/manager-main.component';
import { StatisticsMainComponent} from './statistics/statistics-main/statistics-main.component';
import { MenuMainComponent } from './menu/menu-main/menu-main.component';
import { PersonnelMainComponent } from './personnel/personnel-main/personnel-main.component';
import{PersonnelDatabaseComponent} from './personnel/personnel-database/personnel-database.component';
import{PersonnelRegistrationComponent} from './personnel/personnel-registration/personnel-registration.component';

const routes: Routes = [{path: '', component: ManagerMainComponent, children: [ 
  {path: '', redirectTo: 'statistics', pathMatch:'full'},
  {path: 'statistics', component: StatisticsMainComponent},
  {path: 'menu', component: MenuMainComponent},
  {path: 'personnel/database', component: PersonnelDatabaseComponent},
  {path: 'personnel/registration', component: PersonnelRegistrationComponent},
  //{path: 'room-editor', component: RoomEditorMainComponent}
]}];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
