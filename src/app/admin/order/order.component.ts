import {Component, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IngredientService} from '../../services/ingredient.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ButtonRendererComponent} from '../button-renderer/button-renderer.component';
import {User} from '../../interfaces/user';
import {OrderService} from '../../services/order.service';
import {Order} from '../../interfaces/Order';
import {log} from 'util';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @ViewChild('grid') grid: AgGridAngular;



  notPaidOrders: Order[] = [];
  notTakenInChargeOrders: Order[] = [];
  takenInChargeOrders: Order[] = [];
  readyOrders: Order[] = [];


  constructor(private orderService: OrderService) {


  }

  ngOnInit(): void {
this.chargerWorflow();
  }


  chargerWorflow(): void {
    this.getNonPaidOrders();
    this.getNotTakenInChargeOrders();
    this.getTakenInChargeOrders();
    this.getReadyOrders();
  }


  getNonPaidOrders(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.orderService.getNonPaidOrders(token).subscribe(orders => this.notPaidOrders = orders);
  }

  getNotTakenInChargeOrders(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.orderService.getNontreatedOrders(token).subscribe(orders => this.notTakenInChargeOrders = orders);
  }

  getTakenInChargeOrders(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.orderService.getMyOrders(token).subscribe(orders => this.takenInChargeOrders = orders);
  }

  getReadyOrders(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.orderService.getReadyOrders(token).subscribe(orders => this.readyOrders = orders);
  }

  orderIsPaid(id: number): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.orderService.orderIsPaid(token, id).subscribe(() => this.chargerWorflow());
  }

  takeInCharge(id: number): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.orderService.takeInCharge(token, id).subscribe(() => this.chargerWorflow());
  }

  makeReady(id: number): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.orderService.ready(token, id).subscribe(() => this.chargerWorflow());
  }

  deliverOrder(id: number) {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.orderService.orderIsPick(token, id).subscribe(() => this.chargerWorflow());
  }
}
