import { Component, OnInit, HostBinding } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { ActivatedRoute, Router } from '@angular/router';
import {RecipesService} from 'src/app/services/recipes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  recipe: Recipe = {
    name: '',
    ingredients: null,
    steps: null,
    category:'',
    difficulty:0,
    created: new Date()
  };
  url: any;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) { }
  
  id: string = "";
  ingredients = null;
  ingredient :string;
  quantity :string;
  steps = null;
  step: string;
  image: File = null;

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') != null){
      this.id = this.route.snapshot.paramMap.get('id');
      this.getRecipe(this.id);
    }
  }
  saveRecipe() {
    this.recipe.ingredients = this.ingredients;
    this.recipe.steps = this.steps;

    const formData = new FormData();
    if (this.image != null) {
      formData.append('image', this.image,this.image.name);
    }

    if (this.id =='') {
      this.recipesService.saveRecipe(this.recipe).subscribe(
        res => { 
          this.id = res['recipe']._id;
          if (this.image != null) {
              this.recipesService.saveImage(this.id, formData).subscribe(
                res => { console.log(res);
                  this.router.navigate(['recipes/view/'+this.id]);
                }, err => { console.log(err) }
              );
          }
          this.router.navigate(['recipes/view/'+this.id]);
        }, err => { console.log(err) }
      );
    } else {
      this.recipesService.updateRecipe(this.id, this.recipe).subscribe(
        res => { 
          if (this.image != null) {
            this.recipesService.saveImage(this.id, formData).subscribe(
              res => { console.log(res);}, err => { console.log(err) }
            );
            this.router.navigate(['recipes/view/'+this.id]);
          }
        }, err => {console.log(err)}
      );  
    }
  }

  processFile(image: any) {
    if (image.files && image.files[0]) {
      this.image = image.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(image.files[0]);
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result; //add source to image
      }
    }
  }
  getRecipe(id: string){
    this.recipesService.getRecipe(id).subscribe(
      res => {this.recipe = res , 
          this.url = environment.API_URL + res.imagePath;
          this.ingredients = res.ingredients;
          this.steps = res.steps;
        },
      err => console.log(err)
    );
  }
  addIngredient() {
    if (this.ingredients === null) {
      this.ingredients = [];
    }
    this.ingredients.push({name: this.ingredient, quantity: this.quantity});
    this.ingredient = "";
    this.quantity = "";
  }

  addStep() {
    if (this.steps === null) {
      this.steps = [];
    }
    this.steps.push({description: this.step});
    this.step = "";
  }

  deleteIngr(index:number) {
    if (index > -1){
      this.ingredients.splice(index,1)
    }
  }

  deleteStep(index:number){
    if (index > -1){
      this.steps.splice(index,1)
    }
  }
}
