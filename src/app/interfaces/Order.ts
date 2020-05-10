import {User} from './user';
import {MenuOrder} from './MenuOrder';
import {ProductLineOrder} from './ProductLineOrder';

export interface Order {
  id: number;
  price: number;
  orderNum: number;
  inChargeOfOrder: User;
  orderCustomer: User;
  menuOrders: MenuOrder[];
  productLineOrders: ProductLineOrder[];
}
