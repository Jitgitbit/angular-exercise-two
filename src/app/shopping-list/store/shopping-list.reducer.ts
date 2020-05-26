import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

import { ADD_INGREDIENT } from './shopping-list.actions';


const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 25),
    new Ingredient('Potatoes', 10),
    new Ingredient('Onions', 3),
    new Ingredient('Watermelon', 1),
  ]
};

export function shoppingListReducer(state = initialState, action: Action){
  switch (action.type){
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      };
  };
};