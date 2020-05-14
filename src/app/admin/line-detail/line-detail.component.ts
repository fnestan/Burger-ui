import {Component, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductLineService} from '../../services/product-line.service';
import {TypeService} from '../../services/type.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ProductService} from '../../services/product.service';
import {ButtonRendererComponent} from '../button-renderer/button-renderer.component';
import {Product} from '../../interfaces/Product';
import {User} from '../../interfaces/user';
import {RecipeService} from '../../services/recipe.service';
import {ProductLine} from '../../interfaces/ProductLine';
import {IngredientService} from '../../services/ingredient.service';
import {Ingredient} from '../../interfaces/Ingredient';
import {UnitService} from '../../services/unit.service';
import {Unit} from '../../interfaces/Unit';

@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.component.html',
  styleUrls: ['./line-detail.component.scss']
})
export class LineDetailComponent implements OnInit {
  @ViewChild('grid') grid: AgGridAngular;
  columnDefs = [
    {headerName: 'Quantite', field: 'quantity', sortable: true, filter: true, editable: true},
    {headerName: 'unite', field: 'unit', sortable: true, filter: true},
    {headerName: 'Ingredient', field: 'ingredient', sortable: true, filter: true},
    {headerName: 'Enlevable', field: 'removable', editable: true},
    {
      headerName: '',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.updateRow.bind(this),
        label: 'Modifier'
      }
    },
    {
      headerName: '',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.deleteRow.bind(this),
        label: 'Supprimer'
      }
    }
  ];

  rowData = [];
  frameworkComponents: {};
  product;
  list = [];
  form: FormGroup;
  line: any;
  prds: Product[];
  private descSize: any;
  private prd_id: any;
  private price: any;
  private orderable: any;
  lineList: ProductLine[];
  ingredients: Ingredient[];
  units: Unit[];

  constructor(private lineService: ProductLineService, private typeService: TypeService, private route: ActivatedRoute,
              public ngxSmartModalService: NgxSmartModalService,
              private formBuilder: FormBuilder,
              private router: Router,
              private productService: ProductService,
              private ingedientService: IngredientService,
              private unitService: UnitService,
              private recipeService: RecipeService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
    this.form = formBuilder.group({
      quantity: ['', Validators.required],
      removable: ['', Validators.required],
      unitId: ['', Validators.required],
      ingredientId: ['', Validators.required],
      productLineId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.line = JSON.parse(localStorage.getItem('line'));
    const data = [];
    this.line.recipes.forEach(recette => {
      data.push({
        id: recette.id,
        quantity: recette.quantity,
        unit: recette.unit.name,
        ingredient: recette.ingredient.name,
        removable: recette.removable
      });
    });
    this.rowData = data;
    console.log(data);
    this.chargerList();
    this.initValue();
  }

  ondescSizeChange(innerHTML: any) {
    return this.descSize = innerHTML.toString().split('<')[0];
  }

  onNameChange2(value: any) {
    return this.prd_id = value;
  }

  chargerList() {
    this.productService.getAllProduct().subscribe(prds => this.prds = prds);
  }

  updateLine() {
    let o = this.orderable === '' ? false : true;
    const l = {
      desc_size: this.descSize,
      price: this.price,
      orderable: o,
    };
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.lineService.updateProductLine(token, l, this.line.id).subscribe(() => this.router.navigate(['admin']));
  }

  onPriceChange(innerHTML: any) {
    return this.price = innerHTML;
  }

  onOrderableChange(innerHTML: any) {
    return this.orderable = innerHTML;
  }

  private initValue() {
    const prd = JSON.parse(localStorage.getItem('product'));
    this.descSize = this.line.desc_size;
    this.orderable = this.line.orderable;
    this.prd_id = prd.id;
    this.price = this.line.price;
  }

  updateRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const data: any = {
      quantity: event.rowData.quantity,
      removable: event.rowData.removable
    };
    this.recipeService.updateRecipe(token, (data as FormData), event.rowData.id).subscribe(() => this.ngOnInit());
  }

  newRecipe() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    let o = this.form.value.removable === '' ? false : true;
    console.log(this.form.value);
    this.recipeService.createRecipe(token, this.form.value).subscribe(() => {
      this.form.reset();
      this.router.navigate(['admin']);
    });

  }

  getProductsLines(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.lineService.getAllProductLine(token).subscribe(lines => this.lineList = lines);
  }

  getIngredients(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.ingedientService.getAllIngredients(token).subscribe(ingredients => this.ingredients = ingredients);
  }

  getUnits(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.unitService.getAllUnit(token).subscribe(units => this.units = units);
  }

  deleteRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.recipeService.deleteRecipe(token, event.rowData.id).subscribe(() => {
      this.router.navigate(['admin']);
    });
  }

  prepareSelect() {
  this.getIngredients();
  this.getUnits();
  this.getProductsLines();
  }
}
