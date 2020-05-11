import {Component, OnInit, ViewChild} from '@angular/core';
import {DiscountService} from '../../services/discount.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {MenuService} from '../../services/menu.service';
import {ProductLineService} from '../../services/product-line.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ButtonRendererComponent} from '../button-renderer/button-renderer.component';
import {AgGridAngular} from 'ag-grid-angular';
import {Forward} from '../../interfaces/Forward';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  @ViewChild('grid') grid: AgGridAngular;

  columnDefs = [
    {headerName: 'Element', field: 'element', sortable: true, filter: true},
    {headerName: 'prix', field: 'discount', sortable: true, filter: true, editable: true},
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

  list: any[];
  element: string;

  form: FormGroup;

  constructor(private discountService: DiscountService,
              public ngxSmartModalService: NgxSmartModalService,
              private menuService: MenuService,
              private productLineService: ProductLineService,
              private formBuilder: FormBuilder) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
    this.form = formBuilder.group({
      discountPrice: ['', Validators.required],
      productLineId: [],
      menuId: [],
    });
  }

  ngOnInit(): void {
    this.getAllDiscounts();
  }


  getAllDiscounts(): void {
    this.discountService.getAllDiscount().subscribe(discounts => {
        const data = [];
        discounts.forEach(discount => {
          let element;
          if (discount.menu) {
            element = discount.menu.name;
          } else {
            element = `${discount.productLine.__product__.name} ${discount.productLine.desc_size}`;
          }
          data.push({
            id: discount.id,
            element,
            discount: discount.discount + ' €'
          });
        });
        this.rowData = data;
      }
    );
  }

  deleteRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.discountService.deleteDiscount(token, event.rowData.id).subscribe(() => this.getAllDiscounts());
  }

  updateRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const data: any = {
      discount: event.rowData.discount.split(' ')[0]
    };
    console.log(data);
    this.discountService.updateIngredient(token, (data as FormData), event.rowData.id).subscribe(() => this.getAllDiscounts());
  }

  valueList(event: any): void {
    this.list = [];
    if (event.target.value === 'Menu') {
      this.menuService.getAllMenu().subscribe(data => {
        this.list = data;
      });
      this.element = 'Menu';
    } else {
      const user: User = JSON.parse(localStorage.getItem('user'));
      const token = user.token;
      this.productLineService.getAllProductLine(token).subscribe(data => {
          this.list = data;
        }
      );
      this.element = 'Line';

    }
  }

  createForward() {
    if (this.form.valid) {
      const user: User = JSON.parse(localStorage.getItem('user'));
      const token = user.token;
      console.log(this.form.value);
      this.discountService.createDiscount(token, this.form.value).subscribe(() => {
        this.form.reset();
        this.getAllDiscounts();
      });
    }
  }
}
