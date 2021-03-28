import { Component, OnInit, NgZone} from '@angular/core';
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
    public speechSynthService: SpeechSynthesisService,
    private zone: NgZone) { }

  recipe: Recipe;
  id: string = this.route.snapshot.paramMap.get('id');
  server: String = environment.API_URL;
  playbackStatus: string;
  ingredientsList: SpeechSynthesisUtterance;
  stepsList: SpeechSynthesisUtterance;
  //buttonsConfig:

  ngOnInit() {
    this.getRecipe(this.id);
  }

  getRecipe(id: string){
    this.recipesService.getRecipe(id).subscribe(
      res => { 
        this.recipe = res;
        this.ingredientsList = this.loadIngredients(this.recipe.ingredients);
        this.stepsList = this.loadSteps(this.recipe.steps);
        this.setListeners(this.ingredientsList);
        this.setListeners(this.stepsList);
      },
      err => console.log(err)
    );
  }

  setListeners( speechSyntUtt:SpeechSynthesisUtterance ) {
    speechSyntUtt.onstart = () =>{
      this.zone.run( () => {
        this.playbackStatus = 'playing';
        console.log(this.playbackStatus);  
      });
    }
    speechSyntUtt.onend = () =>{
      this.zone.run( () => {
        this.playbackStatus = 'stopped';
        console.log(this.playbackStatus);
        });
    }
    speechSyntUtt.onpause = () =>{
      this.zone.run( () => {
        this.playbackStatus = 'paused';
        console.log(this.playbackStatus);
        });
    }
    speechSyntUtt.onresume = () =>{
      this.zone.run( () => {
        this.playbackStatus = 'playing';
        console.log(this.playbackStatus);
        });
    }
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

  reproduceIngredients() {
    this.cancel();
    this.speak(this.ingredientsList);
  }

  reproduceSteps() {
    this.cancel();
    this.speak(this.stepsList)
  }

  speak(voicemsg){
    this.speechSynthService.speak(voicemsg);
  }

  cancel() {
    this.speechSynthService.cancel();
  }
  pause() {
    this.speechSynthService.pause();
  }

  resume() {
    this.speechSynthService.resume();
  }

  }
