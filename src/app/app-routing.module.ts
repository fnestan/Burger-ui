import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {MenuComponent} from './components/menu/menu.component';
import {LoginComponent} from './components/login/login.component';
import {CartComponent} from './cart/cart.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'menus/:id', component: MenuComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)},
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
