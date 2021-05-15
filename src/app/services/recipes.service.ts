import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Recipe } from 'src/app/models/Recipe';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  API_URI = environment.API_URL + '/api';

  private filteredRecipes = new Subject<Recipe[]>();

  constructor(private http: HttpClient) { }

  // To share de result of the search with the list component
  /**
   * @returns Observable
   */
  getSearchResults():Observable<Recipe[]> {
    return this.filteredRecipes.asObservable();
  }
  /**
   * @param  {Recipe[]} recipes
   * @returns void
   */
  updateSearchResults(recipes: Recipe[]): void {
    this.filteredRecipes.next(recipes);
  }

  // To get all the stored recipes
  /**
   * @returns Observable
   */
  getRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${this.API_URI}/recipes`);
  }

  // To get recipes filetered by name and category
  /**
   * @param  {string} term
   * @returns Observable
   */
  getFilteredRecipes(term: string):Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.API_URI}/recipes/search/${term}`)
  }

  // To get a unique recipe filtered by Id
  /**
   * @param  {string} id
   * @returns Observable
   */
  getRecipe(id: string):Observable<Recipe>{
    return this.http.get<Recipe>(`${this.API_URI}/recipes/${id}`);
  }

  //To delete a specific recipe
  /**
   * @param  {string} id
   */
  deleteRecipe(id: string){
    return this.http.delete(`${this.API_URI}/recipes/${id}`);
  }

  // To save a recipe into de storage
  /**
   * @param  {Recipe} recipe
   */
  saveRecipe(recipe: Recipe){
    return this.http.post(`${this.API_URI}/recipes`,recipe); 
  }

  // To save the image of the recipe
  /**
   * @param  {string} id
   * @param  {FormData} form
   */
  saveImage(id: string, form: FormData) {
    return this.http.put(`${this.API_URI}/recipes/image/${id}`,form); 
  }

  // To update an specific recipe
  /**
   * @param  {string} id
   * @param  {Recipe} updatedRecipe
   */
  updateRecipe(id:string, updatedRecipe: Recipe){
    return this.http.put(`${this.API_URI}/recipes/${id}`, updatedRecipe);
  }

  getThumbnail(id:string){
    return this.http.get(`${this.API_URI}/thumb/${id}`)    
  }

}
