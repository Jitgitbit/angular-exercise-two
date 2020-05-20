import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://phoenixrecipebook.firebaseio.com/recipes.json', recipes)
      .subscribe((response) => {
        console.log(`storeRecipes response says what?`, response);
      });
  }
  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),                                               //----> here take will take 1 value from the observable, and then unsubscribe !
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          'https://phoenixrecipebook.firebaseio.com/recipes.json',
          {
            params: new HttpParams().set('auth', user.token),
          }
        );
      }),
      map((recipes) => {                                      //----> this map is the rxjs operator
        return recipes.map((recipe) => {                          //----> this map is the normal JS ArrayMethod
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        console.log(`fetchRecipes response says what?`, recipes);
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
