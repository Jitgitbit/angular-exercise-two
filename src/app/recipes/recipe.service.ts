import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';


@Injectable()
export class RecipeService {
  // recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe('Croissant with soft Egg', 'Very nice breakfast.', 'https://p0.pikrepo.com/preview/800/706/bread-with-tomato-and-green-vegetable-on-white-ceramic-plate.jpg',[
  //     new Ingredient('Egg', 1),
  //     new Ingredient('Croissant', 1),
  //     new Ingredient('Cherry Tomato', 2),
  //     new Ingredient('Rucola', 9),
  //     new Ingredient('Guacamole', 1),
  //   ]),
  //   new Recipe('Tasty Schnitzel', 'The famous awesome german dish.', 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',[
  //     new Ingredient('Turkey Filet', 1),
  //     new Ingredient('Chappelure', 1),
  //     new Ingredient('Lemon', 1),
  //     new Ingredient('Belgian Fries', 20),
  //     new Ingredient('Mustard', 1),
  //   ]),
  //   new Recipe('Indonesian Cuisine', 'Healthy and tasty!', 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Indonesian_Food.png',[
  //     new Ingredient('Chicken Filet', 3),
  //     new Ingredient('Eggs', 2),
  //     new Ingredient('Zucchini', 2),
  //     new Ingredient('Sticky Rice', 1),
  //     new Ingredient('Lettuce', 1),
  //     new Ingredient('Tomato', 1),
  //   ]),
  //   new Recipe('Spaghetti al Pomodoro', 'What else you need to say?', 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Spaghetti_al_Pomodoro.JPG',[
  //     new Ingredient('Spaghetti', 100),
  //     new Ingredient('Parmeggiano Cheese', 2),
  //     new Ingredient('Garlic', 2),
  //     new Ingredient('Oregano', 1),
  //     new Ingredient('Basilicum', 13),
  //     new Ingredient('Tomato', 7),
  //   ]),
  //   new Recipe('Summer Salad', 'A refreshing dish', 'https://www.maxpixel.net/static/photo/1x/Salad-Summer-Salad-Eat-Saltattelier-843085.jpg',[
  //     new Ingredient('Parsley', 2),
  //     new Ingredient('Orange', 1),
  //     new Ingredient('Mint', 1),
  //     new Ingredient('Eggplant', 1),
  //     new Ingredient('Chicory', 1),
  //     new Ingredient('Tomato', 3),
  //     new Ingredient('Cucumber', 1),
  //     new Ingredient('Pinapple', 1),
  //   ]),
  // ];

  constructor(
    private slService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  ){}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes(){
    return this.recipes.slice();         //neat little trick: here I make an exact copy of recipes using slice without args, to avoid mutation !!!
  }
  getRecipe(index: number){
    return this.recipes.slice()[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());         //----> this is necessary to avoid always rendering a copy of the non changed one !
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());         //----> this is necessary to avoid always rendering a copy of the non changed one !
  }
}