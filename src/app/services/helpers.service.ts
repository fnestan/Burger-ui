import {Injectable} from '@angular/core';
import {TypeService} from './type.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  vari: string;

  constructor(private service: TypeService) {
  }

  getProduct(token: string, idLine: number): void {
    this.service.getAllTypes(token).pipe(
      map(types => {
        const products = types.map(type => type.products);
        products.map(p => {
          p[0].productLines.filter(line => line.id === idLine);
        });
      }),
    ).subscribe();
  }
}
