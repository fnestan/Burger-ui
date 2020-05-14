import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  login(formData: FormData): Observable<User> {
    return this.httpClient.post<User>('http://localhost:3000/auth/login', formData);

  }

  signup(formData: FormData): Observable<User> {
    return this.httpClient.post<User>('http://localhost:3000/auth/signUp', formData);

  }

  logout(token: string): void {
    const headers = {authorization: token};
    this.httpClient.get('http://localhost:3000/auth/logout', {headers});

  }
}
