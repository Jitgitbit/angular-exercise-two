import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 25),
    new Ingredient('Potatoes', 10),
    new Ingredient('Onions', 3),
    new Ingredient('Watermelon', 1),
  ];
  getIngredients(){
    return this.ingredients.slice();           //just returning a copy !!
  }
  getIngredient(index: number){
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]){
    // for(let ingredient of ingredients){
    //   this.addIngredient(ingredient);                              // A viable option, but is heavy due to many events !!!
    // }
    this.ingredients.push(...ingredients);                            // Spread Operator makes it much lighter !!!
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number){
    this.ingredients.splice(index, 1 );                          //------->>> using .splice for what it is made for !!!
    this.ingredientsChanged.next(this.ingredients.slice());               //--------->> using .slice for making a copy, no mutations ;) !
  }
}