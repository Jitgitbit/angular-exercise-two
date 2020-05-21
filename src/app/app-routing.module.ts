import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>                                                        //=====> take heed of this Syntax !
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>                                                        //=====> take heed of this Syntax !
      import('./shopping-list/shopping-list.module').then((m) => m.ShoppingListModule),
  },
  {
    path: 'auth',
    loadChildren: () =>                                                        //=====> take heed of this Syntax !
      import('./auth/auth.module').then((m) => m.AuthModule),
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
