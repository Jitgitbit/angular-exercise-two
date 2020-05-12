import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Croissant with soft Egg', 'Very nice breakfast', 'https://p0.pikrepo.com/preview/800/706/bread-with-tomato-and-green-vegetable-on-white-ceramic-plate.jpg', [
      new Ingredient('Egg', 1),
      new Ingredient('Croissant', 1),
      new Ingredient('Cherry Tomato', 2),
      new Ingredient('Rucola', 9),
      new Ingredient('Guacamole', 1),
    ]),
    new Recipe('Tasty Schnitzel', 'The famous awesome german dish', 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', [
      new Ingredient('Turkey Meat Filet', 1),
      new Ingredient('Chappelure', 1),
      new Ingredient('Lemon', 1),
      new Ingredient('Belgian Fries', 20),
      new Ingredient('Mustard', 1),
    ]),
    new Recipe('Big Fat Burger', 'What else you need to say?', 'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg', [
      new Ingredient('Bacon', 3),
      new Ingredient('Angus Beef Hamburger', 1),
      new Ingredient('Emmenthal Cheese', 2),
      new Ingredient('Iceberg lettuce', 1),
      new Ingredient('Mustard', 1),
    ]),
  ];

  constructor(private slService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice();         //neat little trick: here I make an exact copy of recipes using slice without args, to avoid mutation !!!
  }
  getRecipe(index: number){
    return this.recipes.slice()[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
}