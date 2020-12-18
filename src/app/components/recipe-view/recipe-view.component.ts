import { Component, OnInit, HostBinding} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from "src/app/models/Recipe";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {

  constructor(private recipesService: RecipesService, private route: ActivatedRoute) { }

  recipe: Recipe;
  id: string = this.route.snapshot.paramMap.get('id');
  server: String = environment.API_URL;

  ngOnInit() {
    this.getRecipe(this.id);
  }

  getRecipe(id: string){
    this.recipesService.getRecipe(id).subscribe(
      res => {console.log(res); this.recipe = res},
      err => console.log(err)
    );
  }
}
