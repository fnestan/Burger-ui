import {ProductLine} from './ProductLine';
import {MenuOrder} from './MenuOrder';

export interface Menu {
  id: number;
  name: string;
  price: number;
  orderable: boolean;
  priceXl: number;
  productLines: ProductLine[];
  menuOrders: MenuOrder[];
}
