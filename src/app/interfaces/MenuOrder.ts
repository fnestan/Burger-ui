import {Menu} from './Menu';
import {Order} from './Order';

export interface MenuOrder {

  id: number;
  order: Order;
  menu: Menu;
  IsXl: boolean;
  price: number;
  ingredientRemove: string;
}
