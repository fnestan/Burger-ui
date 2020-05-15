import {Component, OnInit} from '@angular/core';
import {Order} from '../interfaces/Order';
import {ProductLine} from '../interfaces/ProductLine';
import {Menu} from '../interfaces/Menu';
import {OrderService} from '../services/order.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: (Menu & ProductLine)[] = [];

  constructor(private orderService: OrderService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('orders')) as (Menu & ProductLine)[];
    this.cart.forEach(order => (order as any).isXL = false);
  }

  order() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;

    const menuIds = [];
    const productLineIds = [];
    this.cart.forEach(menu => {
      if (!menu.desc_size) {
        menuIds.push({
          menuId: menu.id,
          xl: (menu as any).isXL,
          productLine: []
        });
      }
    });

    this.cart.forEach(productLine => {
      if (productLine.desc_size) {
        productLineIds.push({
          productLineId: productLine.id,
          ingredienttoremove: []
        });
      }
    });

    const orders = {
      menuIds,
      productLineIds
    };

    console.log(orders)

    this.orderService.createOrder(token, orders).subscribe(() => {
      localStorage.removeItem('orders');
      this.cart = [];
      this.toastrService.success('Commande effectuée avec succès', 'Yeah !');
    });
  }

  getTotalPrice(): number {
    return this.cart.reduce((acc, curr) => acc + curr.price, 0);
  }

  deleteRow(order: Menu & ProductLine) {
    this.cart = this.cart.filter(currentOrder => currentOrder !== order);
  }

  isXLMenu($event: any, order: Menu & ProductLine) {
    const currOrder = this.cart.find(currentOrder => currentOrder.id === order.id);
    (currOrder as any).isXL = $event.target.checked;
  }
}
