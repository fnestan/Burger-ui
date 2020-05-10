import {Product} from './Product';

export interface ProductLine {
  id: number;
  desc_size: string;
  price: number;
  orderable: boolean;
  __product__: Product;
}
