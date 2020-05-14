import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Unit} from '../interfaces/Unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private httpClient: HttpClient) {
  }

  getAllUnit(token: string): Observable<Unit[]> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.get<Unit[]>('http://localhost:3000/units/', {headers});

  }

  createUnit(token: string, formData: FormData, id: number): Observable<Unit> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.post<Unit>('http://localhost:3000/units/', {headers});

  }

  updateUnit(token: string, formData: FormData, id: number): Observable<Unit> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.put<Unit>('http://localhost:3000/types/' + id, formData, {headers});
  }

  deleteUnit(token: string, id: number): void {
    const headers = {authorization: 'Bearer ' + token};
    this.httpClient.delete('http://localhost:3000/types/' + id, {headers});

  }
}
