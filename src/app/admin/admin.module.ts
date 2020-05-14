import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {HomeComponent} from './home/home.component';
import {ForwardComponent} from './forward/forward.component';
import {AgGridModule} from 'ag-grid-angular';
import {ButtonRendererComponent} from './button-renderer/button-renderer.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {ReactiveFormsModule} from '@angular/forms';
import {DiscountComponent} from './discount/discount.component';
import {MenuComponent} from '../components/menu/menu.component';
import {MenusComponent} from './menus/menus.component';
import {MenuDetailComponent} from './menu-detail/menu-detail.component';
import {TypeComponent} from './type/type.component';
import {TypeDetailComponent} from './type-detail/type-detail.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {LineDetailComponent} from './line-detail/line-detail.component';
import {ToastrModule} from 'ngx-toastr';
import {DiscountCreationComponent} from './discount-creation/discount-creation.component';
import {ForwardCreationComponent} from './forward-creation/forward-creation.component';


@NgModule({
  declarations: [
    HomeComponent,
    ForwardComponent,
    ButtonRendererComponent,
    DiscountComponent,
    MenusComponent,
    MenuDetailComponent,
    TypeComponent,
    TypeDetailComponent,
    ProductDetailComponent,
    LineDetailComponent,
    DiscountCreationComponent,
    ForwardCreationComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AgGridModule,
    NgxSmartModalModule.forChild(),
    ReactiveFormsModule,
    ToastrModule
  ]
})
export class AdminModule {
}
