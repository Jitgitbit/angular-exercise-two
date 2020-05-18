import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService){}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://phoenixrecipebook.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(`storeRecipes response says what?`,response)
      });
  }
  fetchRecipes(){
    this.http
      .get<Recipe[]>('https://phoenixrecipebook.firebaseio.com/recipes.json')
      .subscribe(recipes => {
        console.log(`storeRecipes response says what?`, recipes);
        this.recipeService.setRecipes(recipes);
      });
  }
}