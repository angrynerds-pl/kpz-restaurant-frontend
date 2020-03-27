import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CookModule } from './modules/cook/cook.module';
import { HomeModule } from './modules/home/home.module';
import { ManagerModule } from './modules/manager/manager.module';
import { WaiterModule } from './modules/waiter/waiter.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CookModule,
    HomeModule,
    ManagerModule,
    WaiterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
