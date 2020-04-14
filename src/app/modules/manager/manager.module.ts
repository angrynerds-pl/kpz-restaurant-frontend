import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ManagerRoutingModule } from "./manager-routing.module";
import { ManagerMainComponent } from "./manager-main/manager-main.component";
import { ManagerTopNavbarComponent } from "./manager-top-navbar/manager-top-navbar.component";
import { ManagerFooterComponent } from "./manager-footer/manager-footer.component";
import { StatisticsMainComponent } from "./statistics/statistics-main/statistics-main.component";
import { MenuMainComponent } from "./menu/menu-main/menu-main.component";

import { MenuListComponent } from "./menu/view/menu-list/menu-list.component";
import { MenuEditComponent } from "./menu/edit/menu-edit/menu-edit.component";
import { MenuAddCategoryComponent } from "./menu/edit/menu-add-category/menu-add-category.component";
import { MenuAddProductComponent } from "./menu/edit/menu-add-product/menu-add-product.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

import { ToastrModule } from "ngx-toastr";
import { PersonnelDatabaseComponent } from "./personnel/personnel-database/personnel-database.component";
import { PersonnelRegistrationComponent } from "./personnel/personnel-registration/personnel-registration.component";
import { PersonnelDatabaseDialogComponent } from './personnel/personnel-database-dialog/personnel-database-dialog.component';
import { PersonnelAccountComponent } from './personnel/personnel-account/personnel-account.component';
import { RoomEditorMainComponent } from './room-editor/room-editor-main/room-editor-main.component';
import { TableOptionComponent } from './room-editor/table-option/table-option.component';
@NgModule({
  declarations: [
    ManagerMainComponent,
    ManagerTopNavbarComponent,
    ManagerFooterComponent,
    StatisticsMainComponent,
    MenuMainComponent,
    MenuListComponent,
    MenuEditComponent,
    MenuAddCategoryComponent,
    MenuAddProductComponent,
    PersonnelDatabaseComponent,
    PersonnelRegistrationComponent,
    PersonnelDatabaseDialogComponent,
    PersonnelAccountComponent,
    RoomEditorMainComponent,
    TableOptionComponent,
    
  ],

  imports: [
    CommonModule,
    ManagerRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatButtonModule
    
  ]
})
export class ManagerModule {}
