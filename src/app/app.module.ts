import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookModule } from './modules/cook/cook.module';
import { CookRoutingModule } from './modules/cook/cook-routing.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CookModule,
    CookRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
