import {Product} from './Product';
import {Unit} from './Unit';
import {Recipe} from './Recipe';

export interface ProductLine {
  id: number;
  desc_size: string;
  price: number;
  orderable: boolean;
  recipes: Recipe[];
  __product__: Product;
}
