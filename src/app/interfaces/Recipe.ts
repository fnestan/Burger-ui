import {Ingredient} from './Ingredient';
import {ProductLine} from './ProductLine';
import {Unit} from './Unit';

export interface Recipe {
  id: number;
  quantity: number;
  removable: boolean;
  unit: Unit;
  productLine: ProductLine;
  ingredient: Ingredient;
}
