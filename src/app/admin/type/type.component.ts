import {Component, OnInit, ViewChild} from '@angular/core';
import {TypeService} from '../../services/type.service';
import {AgGridAngular} from 'ag-grid-angular';
import {Router} from '@angular/router';
import {ButtonRendererComponent} from '../button-renderer/button-renderer.component';
import {User} from '../../interfaces/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  @ViewChild('grid') grid: AgGridAngular;

  columnDefs = [
    {headerName: 'nom', field: 'label', sortable: true, filter: true},
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
  types = [];
  form: FormGroup;
  list = [];

  constructor(private typeService: TypeService,
              private router: Router,
              public ngxSmartModalService: NgxSmartModalService,
              private formBuilder: FormBuilder) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
    this.form = formBuilder.group({
      label: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllTypes();
  }

  getAllTypes() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.typeService.getAllTypes(token).subscribe(types => {
      this.types = types;
      const data = [];
      types.forEach(type => {
        data.push({
          id: type.id,
          label: type.label
        });
      });
      this.rowData = data;
    });
  }

  deleteRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.typeService.deleteTypes(token, event.rowData.id).subscribe(() => this.getAllTypes());
  }

  editRow(event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const type = this.types.find(t => t.id === event.rowData.id);
    localStorage.setItem('product', JSON.stringify(type));
    this.router.navigate(['admin/type/', event.rowData.id]);
  }

  newType() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.typeService.createType(token, this.form.value).subscribe(data => {
      this.grid.api.updateRowData({
        add: [{id: data.id, label: data.label}]
      });
      this.form.reset();
    });
  }
}
