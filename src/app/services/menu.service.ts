import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Menu} from '../interfaces/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient) {
  }

  getAllMenu(token: string): Observable<Menu[]> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.get<Menu[]>('http://localhost:3000/menus' , {headers});

  }

  getMenuById(id: number, token: string): Observable<Menu> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.get<Menu>('http://localhost:3000/menus/' + id);

  }

  createMenu(token: string, formData: FormData): Observable<Menu> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.post<Menu>('http://localhost:3000/menus/', formData, {headers});

  }

  updateMenu(token: string, formData: FormData, id: number): Observable<Menu> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.put<Menu>('http://localhost:3000/menus/' + id, formData, {headers});
  }

  deleteMenu(token: string, id: number): Observable<string> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.delete<string>('http://localhost:3000/menus/' + id, {headers});

  }

  deleteProductLineOfMenu(token: string, menuId: number, productLineId: number): Observable<any> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.delete<any>('http://localhost:3000/menus/' + menuId + '/' + productLineId, {headers});

  }
}
