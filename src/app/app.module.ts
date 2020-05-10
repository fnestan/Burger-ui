import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AgGridModule} from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSmartModalModule} from 'ngx-smart-modal';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
