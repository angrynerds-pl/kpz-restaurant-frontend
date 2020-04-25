import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerMainComponent} from './manager-main/manager-main.component';
import { StatisticsMainComponent} from './statistics/statistics-main/statistics-main.component';
import { MenuMainComponent } from './menu/menu-main/menu-main.component';
import{PersonnelDatabaseComponent} from './personnel/personnel-database/personnel-database.component';
import{PersonnelRegistrationComponent} from './personnel/personnel-registration/personnel-registration.component';
import { ManagerGuard } from 'src/app/guards/manager.guard';

const routes: Routes = [{path: '', canActivate: [ManagerGuard], component: ManagerMainComponent, children: [ 
  {path: '', redirectTo: 'statistics', canActivate: [ManagerGuard], pathMatch:'full'},
  {path: 'statistics', canActivate: [ManagerGuard], component: StatisticsMainComponent},
  {path: 'menu', canActivate: [ManagerGuard], component: MenuMainComponent},
  {path: 'personnel/database', canActivate: [ManagerGuard], component: PersonnelDatabaseComponent},
  {path: 'personnel/registration', canActivate: [ManagerGuard], component: PersonnelRegistrationComponent},
  //{path: 'room-editor', component: RoomEditorMainComponent}
]}];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
