import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  createProduct(token: string, formData: FormData): Observable<Product> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.post<Product>('http://localhost:3000/products/', formData, {headers});

  }

  updateProduct(token: string, formData: { name: string; typeId: number }, id: number): Observable<Product> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.put<Product>('http://localhost:3000/products/' + id, formData, {headers});
  }

  deleteProduct(token: string, id: number): Observable<string> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.delete<string>('http://localhost:3000/products/' + id, {headers});

  }

  getAllProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:3000/products');
  }
}
