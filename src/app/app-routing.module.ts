import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolver } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},                   // the order is important here, otherwise /new clashes with :id , the dynamic parameter!
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolver]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolver]},
  ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}