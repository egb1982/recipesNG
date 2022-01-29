import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeFormComponent } from "./components/recipe-form/recipe-form.component";
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path:'recipes',
    component:RecipeListComponent
  },
  {
    path:'recipes/add',
    component:RecipeFormComponent
  },
  {
    path:'recipes/view/:id',
    component:RecipeViewComponent
  },
  {
    path:'recipes/edit/:id',
    component:RecipeFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
