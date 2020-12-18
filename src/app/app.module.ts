import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipesService } from './services/recipes.service';
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RecipeFormComponent,
    RecipeListComponent,
    RecipeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ RecipesService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
