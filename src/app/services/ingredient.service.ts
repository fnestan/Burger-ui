import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ingredient} from '../interfaces/Ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private httpClient: HttpClient) {
  }

  getAllIngredients(token: string): Observable<Ingredient[]> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.get<Ingredient[]>('http://localhost:3000/ingredients/', {headers});

  }

  createIngredient(token: string, formData: FormData): Observable<Ingredient> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.post<Ingredient>('http://localhost:3000/ingredients', formData, {headers});

  }

  updateIngredient(token: string, formData: FormData, id: number): Observable<Ingredient> {
    const headers = {authorization: 'Bearer ' + token};
    return this.httpClient.put<Ingredient>('http://localhost:3000/ingredients/' + id, formData, {headers});
  }

}
