import {Order} from './Order';
import {ProductLine} from './ProductLine';

export interface ProductLineOrder {
  id: number;
  order: Order;
  price: number;
  productLine: ProductLine;
  ingredientRemove: string;
}
