import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Recipe } from 'src/app/models/Recipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  API_URI = environment.API_URL + '/api';

  constructor(private http: HttpClient) { }

  getRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${this.API_URI}/recipes`);
  }

  getRecipe(id: string):Observable<Recipe>{
    return this.http.get<Recipe>(`${this.API_URI}/recipes/${id}`);
  }

  deleteRecipe(id: string){
    return this.http.delete(`${this.API_URI}/recipes/${id}`);
  }

  saveRecipe(recipe: Recipe){
    return this.http.post(`${this.API_URI}/recipes`,recipe); 
  }

  saveImage(id: string, form: FormData) {
    return this.http.put(`${this.API_URI}/recipes/image/${id}`,form); 
  }

  updateRecipe(id:string, updatedRecipe: Recipe){
    return this.http.put(`${this.API_URI}/recipes/${id}`, updatedRecipe);
  }
}
