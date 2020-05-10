import {Component, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('grid') grid: AgGridAngular;
  title = 'Burger-ui';
  columnDefs = [
    {headerName: 'Make', field: 'make', sortable: true, filter: true, checkboxSelection: true, editable: true},
    {headerName: 'Model', field: 'model', sortable: true, filter: true},
    {headerName: 'Price', field: 'price', sortable: true, filter: true}
  ];

  rowData = [
    {make: 'Toyota', model: 'Celica', price: 35000},
    {make: 'Ford', model: 'Mondeo', price: 32000},
    {make: 'Porsche', model: 'Boxter', price: 72000}
  ];
  getRows(){
    alert(this.grid.api.getSelectedNodes().map(node => node.data.make).join(';'));
  }
}
