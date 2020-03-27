import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerMainComponent } from './manager-main/manager-main.component';
import { ManagerTopNavbarComponent } from './manager-top-navbar/manager-top-navbar.component';
import { ManagerFooterComponent } from './manager-footer/manager-footer.component';
import { PersonnelMainComponent } from './personnel/personnel-main/personnel-main.component';
import { StatisticsMainComponent } from './statistics/statistics-main/statistics-main.component';
import { MenuMainComponent } from './menu/menu-main/menu-main.component';


@NgModule({
  declarations: [ManagerMainComponent, ManagerTopNavbarComponent, ManagerFooterComponent, PersonnelMainComponent, StatisticsMainComponent, MenuMainComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
