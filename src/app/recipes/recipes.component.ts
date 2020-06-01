import { Component, OnInit } from '@angular/core';

// import { Recipe } from './recipe.model';
// import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService]                          // if we navigate away from the recipes area (f.e.: in the shoppinglist area), the RecipeService
})                                                      // is destroyed !!!!   ----------> so we have to place it on a higher level, i.e the app.module !!
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe;

  constructor() { }

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    //   }
    // );
  }

}
