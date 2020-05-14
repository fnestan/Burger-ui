import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RefTypeProduct} from '../interfaces/Types';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private httpClient: HttpClient) {
  }

  getAllTypes(token: string): Observable<RefTypeProduct[]> {
    if (token) {
      const headers = {authorization: 'Bearer ' + token};
      return this.httpClient.get<RefTypeProduct[]>('http://localhost:3000/types', {headers});
    }
    return this.httpClient.get<RefTypeProduct[]>('http://localhost:3000/types');
  }

  createType(token: string, formData: FormData): Observable<RefTypeProduct> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.post<RefTypeProduct>('http://localhost:3000/types', formData, {headers});

  }

  updateType(token: string, formData: { label: any }, id: number): Observable<RefTypeProduct> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.put<RefTypeProduct>('http://localhost:3000/types/' + id, formData, {headers});
  }

  deleteTypes(token: string, id: number): Observable<string> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.delete<string>('http://localhost:3000/types/' + id, {headers});

  }
}
