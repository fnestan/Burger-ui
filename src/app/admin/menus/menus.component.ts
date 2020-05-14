import {Component, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {FormGroup} from '@angular/forms';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {MenuService} from '../../services/menu.service';
import {ProductLineService} from '../../services/product-line.service';
import {ButtonRendererComponent} from '../button-renderer/button-renderer.component';
import {User} from '../../interfaces/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  @ViewChild('grid') grid: AgGridAngular;

  columnDefs = [
    {headerName: 'nom', field: 'name', sortable: true, filter: true},
    {headerName: 'prix', field: 'price', sortable: true, filter: true},
    {headerName: 'prix en Xl', field: 'priceXl', sortable: true, filter: true},
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

  constructor(private menuService: MenuService,
              private productLineService: ProductLineService, private router: Router) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  ngOnInit(): void {
    this.getAllMenus();
  }

  getAllMenus(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.menuService.getAllMenu(token).subscribe(menus => {
        const data = [];
        menus.forEach(menu => {
          data.push({
            id: menu.id,
            name: menu.name,
            price: menu.price + ' €',
            priceXl: menu.priceXl + ' €',
          });
        });
        this.rowData = data;
      }
    );
  }

  deleteRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.menuService.deleteMenu(token, event.rowData.id).subscribe(() => this.getAllMenus());
  }

  editRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.router.navigate(['admin/menus/', event.rowData.id]);
  }

  newMenu() {
    this.router.navigate(['admin/menus/', 0]);
  }
}
