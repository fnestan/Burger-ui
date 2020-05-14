import {Component, OnInit, ViewChild} from '@angular/core';
import {ForwardService} from '../../services/forward.service';
import {AgGridAngular} from 'ag-grid-angular';
import {User} from '../../interfaces/user';
import {ButtonRendererComponent} from '../button-renderer/button-renderer.component';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {MenuService} from '../../services/menu.service';
import {ProductLineService} from '../../services/product-line.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DiscountCreationComponent} from '../discount-creation/discount-creation.component';
import {ForwardCreationComponent} from '../forward-creation/forward-creation.component';

@Component({
  selector: 'app-forward',
  templateUrl: './forward.component.html',
  styleUrls: ['./forward.component.scss']
})
export class ForwardComponent implements OnInit {

  @ViewChild('grid') grid: AgGridAngular;

  columnDefs = [
    {headerName: 'Element', field: 'element', sortable: true, filter: true},
    {headerName: 'Description', field: 'description', sortable: true, filter: true, editable: true},
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

  constructor(private forwardService: ForwardService,
              public ngxSmartModalService: NgxSmartModalService,
              private menuService: MenuService,
              private productLineService: ProductLineService,
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
    this.getAllForwards();
  }

  getAllForwards(): void {
    this.forwardService.getAllForwerds().subscribe(forwards => {
        const data = [];
        console.log(forwards);
        forwards.forEach(forward => {
          let element;
          if (forward.menu) {
            element = forward.menu.name;
          } else {
            element = `${forward.prductline.__product__.name} ${forward.prductline.desc_size}`;
          }
          data.push({
            id: forward.id,
            element,
            description: forward.description
          });
        });
        this.rowData = data;
      }
    );
  }

  deleteRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.forwardService.deleteForward(event.rowData.id, token).subscribe(() => this.getAllForwards());
  }

  updateRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.forwardService.updateForward(event.rowData.id, (event.rowData as FormData), token).subscribe(() => this.getAllForwards());
  }

  addForward() {
    const modal = this.ngxSmartModalService.create('forward', ForwardCreationComponent);
    modal.onCloseFinished.subscribe(() => {
      // TODO : Update grid
    });
    modal.open();
  }
}
