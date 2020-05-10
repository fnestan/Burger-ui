import {RefTypeProduct} from './Types';
import {ProductLine} from './ProductLine';



export interface Product {

  id: number;
  name: string;
  type: RefTypeProduct;
  productLines: ProductLine[];
}
