import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  findUserById(token: string, id: number): Observable<User> {
    const headers = {authorization: token};
    return this.httpClient.get<User>('http://localhost:3000/users/byId/' + id, {headers});

  }

  findUserByRole(token: string, role: number): Observable<User[]> {
    const headers = {authorization: token};
    return this.httpClient.get<User[]>('http://localhost:3000/users/' + role, {headers});

  }

  updateUser(token: string, id: number, formdata: FormData): Observable<User> {
    const headers = {authorization: token};
    return this.httpClient.put<User>('http://localhost:3000/users/' + id, formdata, {headers});

  }

  deleteUser(token: string, id: number): void {
    const headers = {authorization: token};
    this.httpClient.delete('http://localhost:3000/users/' + id, {headers});

  }
}
