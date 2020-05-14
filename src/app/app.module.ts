import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AgGridModule} from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './components/home/home.component';
import {MenuComponent} from './components/menu/menu.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import { MenuDetailComponent } from './admin/menu-detail/menu-detail.component';
import { TypeComponent } from './admin/type/type.component';
import { TypeDetailComponent } from './admin/type-detail/type-detail.component';
import { ProductDetailComponent } from './admin/product-detail/product-detail.component';
import { LineDetailComponent } from './admin/line-detail/line-detail.component';
import { DiscountCreationComponent } from './admin/discount-creation/discount-creation.component';
import {ToastrModule} from 'ngx-toastr';
import { ForwardCreationComponent } from './admin/forward-creation/forward-creation.component';
import { IngredientComponent } from './admin/ingredient/ingredient.component';
import { IngredientCreationComponent } from './admin/ingredient-creation/ingredient-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot(),
    ToastrModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
