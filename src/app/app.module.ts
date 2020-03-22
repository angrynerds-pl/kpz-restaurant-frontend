import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CookModule } from './modules/cook/cook.module';
import { CookRoutingModule } from './modules/cook/cook-routing.module';

import { HomeModule } from './modules/home/home.module';
import { HomeRoutingModule } from './modules/home/home-routing.module';

import { ManagerModule } from './modules/manager/manager.module';
import { ManagerRoutingModule } from './modules/manager/manager-routing.module';

import { WaiterModule } from './modules/waiter/waiter.module';
import { WaiterRoutingModule } from './modules/waiter/waiter-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CookModule,
    CookRoutingModule,
    HomeModule,
    ManagerModule,
    WaiterModule,
    HomeRoutingModule,
    ManagerRoutingModule,
    WaiterRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
