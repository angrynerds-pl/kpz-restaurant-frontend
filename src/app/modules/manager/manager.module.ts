import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from "ngx-toastr";
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
import { PersonnelDatabaseComponent } from "./personnel/personnel-database/personnel-database.component";
import { PersonnelRegistrationComponent } from "./personnel/personnel-registration/personnel-registration.component";
import { PersonnelDatabaseDialogComponent } from './personnel/personnel-database-dialog/personnel-database-dialog.component';
import { PersonnelAccountComponent } from './personnel/personnel-account/personnel-account.component';
import { RoomEditorMainComponent } from './room-editor/room-editor-main/room-editor-main.component';
import { TableOptionComponent } from './room-editor/table-option/table-option.component';
import { TableEditDialogComponent } from './room-editor/table-edit-dialog/table-edit-dialog.component';
import { TableInfoComponent } from './room-editor/table-info/table-info.component';
import { IncomeComponent } from './statistics/income/income.component';
import { ProductsComponent } from './statistics/products/products.component';
import { CustomersComponent } from './statistics/customers/customers.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './statistics/pie-chart/pie-chart.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
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
    TableEditDialogComponent,
    TableInfoComponent,
    IncomeComponent,
    ProductsComponent,
    CustomersComponent,
    PieChartComponent
  ],

  imports: [
    CommonModule,
    ManagerRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ChartsModule
  ]
})
export class ManagerModule {}
