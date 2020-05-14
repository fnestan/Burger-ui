import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../interfaces/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private httpClient: HttpClient) {
  }

  getAllRecipe(token: string): Observable<Recipe[]> {
    const headers = {authorization: token};
    return this.httpClient.get<Recipe[]>('http://localhost:3000/recipes/', {headers});

  }

  createRecipe(token: string, formData: FormData): Observable<Recipe> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.post<Recipe>('http://localhost:3000/recipes/', formData, {headers});

  }

  updateRecipe(token: string, formData: FormData, id: number): Observable<Recipe> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.put<Recipe>('http://localhost:3000/recipes/' + id, formData, {headers});
  }

  deleteRecipe(token: string, id: number): Observable<string> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.delete<string>('http://localhost:3000/recipes/' + id, {headers});

  }
}
