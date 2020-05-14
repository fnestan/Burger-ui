import {Component, OnInit, ViewChild} from '@angular/core';
import {TypeService} from '../../services/type.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ButtonRendererComponent} from '../button-renderer/button-renderer.component';
import {AgGridAngular} from 'ag-grid-angular';
import {ProductService} from '../../services/product.service';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-type-detail',
  templateUrl: './type-detail.component.html',
  styleUrls: ['./type-detail.component.scss']
})
export class TypeDetailComponent implements OnInit {
  @ViewChild('grid') grid: AgGridAngular;

  columnDefs = [
    {headerName: 'Nom', field: 'name', sortable: true, filter: true},
    {
      headerName: '',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.editRow.bind(this),
        label: 'Editer'
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

  list: any[];
  element: string;

  form: FormGroup;
  type;

  typeName;

  constructor(private typeService: TypeService, private route: ActivatedRoute,
              public ngxSmartModalService: NgxSmartModalService,
              private formBuilder: FormBuilder,
              private router: Router,
              private productService: ProductService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
    this.form = formBuilder.group({
      name: ['', Validators.required],
      typeId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.type = JSON.parse(localStorage.getItem('product'));
    const data = [];
    this.type.products.forEach(prd => {
      data.push({
        id: prd.id,
        name: prd.name
      });
    });
    this.rowData = data;
  }

  onNameChange(innerHTML: any) {
    this.typeName = innerHTML.toString().split('<')[0];
  }

  updateType() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const t = {
      label: this.typeName
    };
    this.typeService.updateType(token, t, this.type.id).subscribe(() => this.ngOnInit());
  }

  deleteRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.productService.deleteProduct(token, event.rowData.id).subscribe(() => {
      this.router.navigate(['admin/types']);
    });
  }

  editRow(event: any): void {
    // const user: User = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('typeID', this.type.id);
    localStorage.removeItem('product');
    const prd = this.type.products.find(p => p.id === event.rowData.id);
    localStorage.setItem('product', JSON.stringify(prd));
    this.router.navigate(['admin/product/', event.rowData.id]);
  }

  newProduct() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.productService.createProduct(token, this.form.value).subscribe(() => this.router.navigate(['admin/types']));
  }

  chargerList() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.typeService.getAllTypes(token).subscribe(t => this.list = t);
  }
}
