import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from "src/app/models/Recipe";
import { environment } from 'src/environments/environment';

import {
  SpeechSynthesisUtteranceFactoryService,
  SpeechSynthesisService,
} from '@kamiazya/ngx-speech-synthesis';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss'],
  providers:[SpeechSynthesisUtteranceFactoryService]
})
export class RecipeViewComponent implements OnInit {

  constructor(private recipesService: RecipesService, 
    private route: ActivatedRoute, 
    public speechUtteranceService: SpeechSynthesisUtteranceFactoryService,
    public speechSynthService: SpeechSynthesisService) { }

  recipe: Recipe;
  id: string = this.route.snapshot.paramMap.get('id');
  server: String = environment.API_URL;
  ingredientsList: SpeechSynthesisUtterance;
  stepsList: SpeechSynthesisUtterance;

  ngOnInit() {
    this.getRecipe(this.id);
  }

  getRecipe(id: string){
    this.recipesService.getRecipe(id).subscribe(
      res => { 
        this.recipe = res;
        this.ingredientsList = this.loadIngredients(this.recipe.ingredients);
        this.stepsList = this.loadSteps(this.recipe.steps);
      },
      err => console.log(err)
    );
  }

  loadIngredients(ingredientsList: any){
    let voiceIngr = [];
    for (const ingredient of ingredientsList){
      const text = ingredient.name + ingredient.quantity;
      voiceIngr.push(text);
    }
    return this.speechUtteranceService.text(voiceIngr.join("\n"));
  }

  loadSteps(stepsList: any){
    let voiceStep = [];
    for (const step of stepsList){
      voiceStep.push(step.description);
    }
    return this.speechUtteranceService.text(voiceStep.join("\n"));
  }
}
