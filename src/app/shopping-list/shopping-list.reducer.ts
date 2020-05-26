import { Ingredient } from '../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 25),
    new Ingredient('Potatoes', 10),
    new Ingredient('Onions', 3),
    new Ingredient('Watermelon', 1),
  ]
};

export function shoppingListReducer(state = initialState, action){};