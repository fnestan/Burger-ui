import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ForwardComponent} from './forward/forward.component';
import {DiscountComponent} from './discount/discount.component';
import {MenusComponent} from './menus/menus.component';
import {MenuDetailComponent} from './menu-detail/menu-detail.component';
import {TypeComponent} from './type/type.component';
import {TypeDetailComponent} from './type-detail/type-detail.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {LineDetailComponent} from './line-detail/line-detail.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'forwards', component: ForwardComponent},
  {path: 'discounts', component: DiscountComponent},
  {path: 'menus', component: MenusComponent},
  {path: 'menus/:id', component: MenuDetailComponent},
  {path: 'types', component: TypeComponent},
  {path: 'type/:id', component: TypeDetailComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'line/:id', component: LineDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
