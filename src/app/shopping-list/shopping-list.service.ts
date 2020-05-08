import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 25),
    new Ingredient('Potatoes', 10),
    new Ingredient('Onions', 3),
    new Ingredient('Watermelon', 1),
  ];
  getIngredients(){
    return this.ingredients.slice();           //just returning a copy !!
  }
  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }
}