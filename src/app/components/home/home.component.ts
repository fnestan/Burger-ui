import {Component, OnInit} from '@angular/core';
import {ForwardService} from '../../services/forward.service';
import {Forward} from '../../interfaces/Forward';
import {Product} from '../../interfaces/Product';
import {DiscountService} from '../../services/discount.service';
import {Discount} from '../../interfaces/Discount';
import {MenuService} from '../../services/menu.service';
import {Menu} from '../../interfaces/Menu';
import {ProductLine} from '../../interfaces/ProductLine';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  forwardList: Forward[] = [];
  discountList: Discount[] = [];
  menuList: Menu[] = [];
  prod: Product;

  constructor(private forwardService: ForwardService, private discoutService: DiscountService, private menuService: MenuService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllForwards();
    this.getAllDiscounts();
    this.getAllMenus();
  }

  getAllForwards(): void {
    this.forwardService.getAllForwerds().subscribe(data => {
      this.forwardList = data;
    });
  }


  getAllDiscounts(): void {
    this.discoutService.getAllDiscount().subscribe(data => {
      this.discountList = data;
    });
  }

  getAllMenus(): void {
    this.menuService.getAllMenu(null).subscribe(menus => this.menuList = menus);
  }

  order(order: Menu & ProductLine) {
    console.log(order);
    const orders: (Menu & ProductLine)[] = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    this.router.navigate(['cart']);
  }
}
