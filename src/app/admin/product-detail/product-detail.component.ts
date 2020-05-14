import {Component, OnInit, ViewChild} from '@angular/core';
import {TypeService} from '../../services/type.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {ButtonRendererComponent} from '../button-renderer/button-renderer.component';
import {User} from '../../interfaces/user';
import {AgGridAngular} from 'ag-grid-angular';
import {ProductLineService} from '../../services/product-line.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('grid') grid: AgGridAngular;
  columnDefs = [
    {headerName: 'Quantite', field: 'desc_size', sortable: true, filter: true},
    {headerName: 'Prix', field: 'price', sortable: true, filter: true},
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
  product;
  productName: string;
  typeId: number;
  list = [];
  prds = [];
  form: FormGroup;

  constructor(private typeService: TypeService, private route: ActivatedRoute,
              public ngxSmartModalService: NgxSmartModalService,
              private formBuilder: FormBuilder,
              private router: Router,
              private productService: ProductService,
              private lineService: ProductLineService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
    this.form = formBuilder.group({
      desc_size: ['', Validators.required],
      price: ['', Validators.required],
      orderable: ['', Validators.required],
      productId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.product = JSON.parse(localStorage.getItem('product'));
    this.getAllTypes();
    this.onNameChange2(localStorage.getItem('typeID'));
    this.onNameChange(this.product.name);
    const data = [];
    this.product.productLines.forEach(line => {
      data.push({
        id: line.id,
        desc_size: line.desc_size,
        price: line.price,
      });
    });
    this.rowData = data;
  }

  getAllTypes(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.typeService.getAllTypes(token).subscribe(data => this.list = data);
  }


  onNameChange(innerHTML: any) {
    this.productName = innerHTML.toString().split('<')[0];
  }

  onNameChange2(event) {
    this.typeId = event;
  }


  updateProduct() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const p = {
      name: this.productName,
      typeId: this.typeId
    };
    this.productService.updateProduct(token, p, this.product.id).subscribe(() => this.router.navigate(['admin/types']));
  }

  chargerList() {
    this.productService.getAllProduct().subscribe(prds => this.prds = prds);
  }

  newType() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.lineService.createProductLine(token, this.form.value).subscribe(() => {
      this.form.reset();
      this.router.navigate(['admin/types']);
    });
  }

  editRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const line = this.product.productLines.find(t => t.id === event.rowData.id);
    localStorage.setItem('line', JSON.stringify(line));
    this.router.navigate(['admin/line/', event.rowData.id]);
  }

  deleteRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.lineService.deleteProductLine(token, event.rowData.id).subscribe(() => {
      this.router.navigate(['admin/types']);
    });
  }

}
