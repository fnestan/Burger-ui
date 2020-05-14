import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductLine} from '../interfaces/ProductLine';

@Injectable({
  providedIn: 'root'
})
export class ProductLineService {

  constructor(private httpClient: HttpClient) {
  }

  createProductLine(token: string, formData: FormData): Observable<ProductLine> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.post<ProductLine>('http://localhost:3000/lines/', formData, {headers});

  }

  updateProductLine(token: string, formData: { desc_size: any; price: any; orderable: any }, id: number): Observable<ProductLine> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.put<ProductLine>('http://localhost:3000/lines/' + id, formData, {headers});
  }

  deleteProductLine(token: string, id: number): Observable<string> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.delete<string>('http://localhost:3000/lines/' + id, {headers});
  }

  getAllProductLine(token: string): Observable<ProductLine[]> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.get<ProductLine[]>('http://localhost:3000/lines', {headers});
  }
}
