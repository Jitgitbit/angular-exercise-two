import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Test Recipe One', 'This is simply a test', 'https://p0.pikrepo.com/preview/800/706/bread-with-tomato-and-green-vegetable-on-white-ceramic-plate.jpg', [
      new Ingredient('Egg', 1),
      new Ingredient('Croissant', 1),
      new Ingredient('Cherry Tomato', 2),
      new Ingredient('Rucola', 9),
      new Ingredient('Guacamole', 1),
    ]),
    new Recipe('Test Recipe One', 'This is simply a test', 'https://p0.pikrepo.com/preview/800/706/bread-with-tomato-and-green-vegetable-on-white-ceramic-plate.jpg', [
      new Ingredient('Egg', 1),
      new Ingredient('Croissant', 1),
      new Ingredient('Cherry Tomato', 2),
      new Ingredient('Rucola', 9),
      new Ingredient('Guacamole', 1),
    ]),
    new Recipe('Test Recipe One', 'This is simply a test', 'https://p0.pikrepo.com/preview/800/706/bread-with-tomato-and-green-vegetable-on-white-ceramic-plate.jpg', [
      new Ingredient('Egg', 1),
      new Ingredient('Croissant', 1),
      new Ingredient('Cherry Tomato', 2),
      new Ingredient('Rucola', 9),
      new Ingredient('Guacamole', 1),
    ]),
  ];

  constructor(private slService: ShoppingListService){
    this.slService;
  }

  getRecipes(){
    return this.recipes.slice();         //neat little trick: here I make an exact copy of recipes using slice without args, to avoid mutation !!!
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){}
}