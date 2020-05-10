import {Menu} from './Menu';
import {ProductLine} from './ProductLine';

export interface Discount {
  id: number;
  menu: Menu;
  productLine: ProductLine;
  discount: number;
}
