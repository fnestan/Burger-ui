import {Component, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ForwardService} from '../../services/forward.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {MenuService} from '../../services/menu.service';
import {ProductLineService} from '../../services/product-line.service';
import {ButtonRendererComponent} from '../button-renderer/button-renderer.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Menu} from '../../interfaces/Menu';
import {User} from '../../interfaces/user';

@Component({
    selector: 'app-menu-detail',
    templateUrl: './menu-detail.component.html',
    styleUrls: ['./menu-detail.component.scss']
})
export class MenuDetailComponent implements OnInit {

    @ViewChild('grid') grid: AgGridAngular;

    columnDefs = [
        {headerName: 'Produit', field: 'produit', sortable: true, filter: true},
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
    formline: FormGroup;
    me: Menu;

    constructor(private route: ActivatedRoute,
                private forwardService: ForwardService,
                public ngxSmartModalService: NgxSmartModalService,
                private menuService: MenuService,
                private productLineService: ProductLineService,
                private formBuilder: FormBuilder,
                private router: Router) {
        this.frameworkComponents = {
            buttonRenderer: ButtonRendererComponent,
        };
        this.form = formBuilder.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            priceXl: ['', Validators.required],
            orderable: ['', Validators.required],
        });

        this.formline = formBuilder.group({
            productLineId: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id;
        if (id != 0) {
            this.getMenuById(id);
        }
    }

    getMenuById(id: number): void {
        const user: User = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        this.menuService.getMenuById(id, token).subscribe(menu => {
            this.me = menu;
            const data = [];
            this.form.setValue({name: menu.name, price: menu.price, priceXl: menu.priceXl, orderable: menu.orderable});
            menu.productLines.forEach(line => {
                data.push({
                    id: line.id,
                    produit: line.__product__.name,
                });
                this.rowData = data;
            });
        });
    }

    deleteRow(event: any): void {
        const user: User = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        const id = this.route.snapshot.params.id;
        this.menuService.deleteProductLineOfMenu(token, id, event.rowData.id).subscribe(() => this.getMenuById(id));
    }

    callList() {
        const user: User = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        this.productLineService.getAllProductLine(token).subscribe(data => {
                this.list = data;
            }
        );
    }

    addRow() {
        const prdLineId = this.formline.value;
        this.rowData.push({
            id: prdLineId,
            produit: 'test'
        });
        this.grid.api.updateRowData({
            add: [{id: prdLineId, produit: 'test'}]
        });
    }

    updateMenu() {
        const lines = this.rowData.map(val => val.id);
        const ids = [];
        lines.forEach(line => ids.push(line.productLineId));
        const menuSent: any = {
            name: this.form.value.name,
            price: this.form.value.price,
            priceXl: this.form.value.priceXl,
            orderable: this.form.value.orderable,
            productLineIds: ids
        };
        const user: User = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        const id = this.route.snapshot.params.id;
        if (id == 0) {
            this.menuService.createMenu(token, menuSent).subscribe(res => {
                this.router.navigate(['admin/menus']);
            });
        } else {
            this.menuService.updateMenu(token, menuSent, id).subscribe(res => {
                this.router.navigate(['admin/menus']);
            });
        }

    }
}
