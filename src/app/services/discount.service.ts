import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Discount} from '../interfaces/Discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private httpClient: HttpClient) {
  }

  getAllDiscount(): Observable<Discount[]> {
    return this.httpClient.get<Discount[]>('http://localhost:3000/discounts');

  }

  createDiscount(token: string, formData: FormData): Observable<Discount> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.post<Discount>('http://localhost:3000/discounts', formData,{headers});

  }

  updateIngredient(token: string, formData: FormData, id: number): Observable<Discount> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.put<Discount>('http://localhost:3000/discounts/' + id, formData, {headers});
  }

  deleteDiscount(token: string, id: number): Observable<string> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.delete<string>('http://localhost:3000/discounts/' + id, {headers});

  }
}
