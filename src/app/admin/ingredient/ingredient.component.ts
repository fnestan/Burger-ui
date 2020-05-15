import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../interfaces/user';
import {ForwardCreationComponent} from '../forward-creation/forward-creation.component';
import {AgGridAngular} from 'ag-grid-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ButtonRendererComponent} from '../button-renderer/button-renderer.component';
import {IngredientService} from '../../services/ingredient.service';
import {IngredientCreationComponent} from '../ingredient-creation/ingredient-creation.component';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {

  @ViewChild('grid') grid: AgGridAngular;

  columnDefs = [
    {headerName: 'Nom', field: 'name', sortable: true, filter: true, editable: true},
    {
      headerName: '',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.updateRow.bind(this),
        label: 'Modifier'
      }
    },
  ];

  rowData = [];
  frameworkComponents: {};

  list: any[];
  element: string;

  form: FormGroup;

  constructor(private ingredientService: IngredientService,
              public ngxSmartModalService: NgxSmartModalService,
              private formBuilder: FormBuilder) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
    this.form = formBuilder.group({
      description: ['', Validators.required],
      productLineId: [],
      menuId: [],
    });
  }

  ngOnInit(): void {
    this.getAllIngredients();
  }

  addIngredient() {
    const modal = this.ngxSmartModalService.create('ingredient', IngredientCreationComponent);
    modal.onCloseFinished.subscribe(() => {
      // TODO : Update grid
    });
    modal.open();
  }

  getAllIngredients(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.ingredientService.getAllIngredients(token).subscribe(ingredients => {
        const data = [];
        ingredients.forEach(ingredient => {
          data.push({
            id: ingredient.id,
            name: ingredient.name
          });
        });
        console.log(data);
        this.rowData = data;
      }
    );
  }


  updateRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    console.log(event.rowData);
    this.ingredientService.updateIngredient(token, (event.rowData as FormData), event.rowData.id).subscribe(() => this.getAllIngredients());
  }

}

