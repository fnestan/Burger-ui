import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Forward} from '../interfaces/Forward';

@Injectable({
  providedIn: 'root'
})
export class ForwardService {

  constructor(private httpClient: HttpClient) {
  }

  getAllForwerds(): Observable<Forward[]> {
    return this.httpClient.get<Forward[]>('http://localhost:3000/forwards');
  }

  deleteForward(id: number, token: string): Observable<string> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.delete<string>('http://localhost:3000/forwards/' + id, {headers});
  }

  updateForward(id: number, data: FormData, token: string): Observable<Forward> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.put<Forward>('http://localhost:3000/forwards/' + id, data, {headers});
  }

  createForward(token: string, value: any): Observable<Forward> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.post<Forward>('http://localhost:3000/forwards/', value, {headers});
  }
}
