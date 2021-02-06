import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {RecipesService} from 'src/app/services/recipes.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Output() public searchDone: EventEmitter<string> = new EventEmitter();

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
  }

  recipeSearch(searchTerm){
    if (searchTerm !== "") {
      this.recipesService.getFilteredRecipes(searchTerm).subscribe(
        res => { 
          this.recipesService.updateSearchResults(res); 
          this.searchDone.emit(searchTerm);
        },
        err => console.log(err)
      );
    } 
    else {
      this.recipesService.getRecipes().subscribe(
        res => this.recipesService.updateSearchResults(res),
        err => console.log(err)
      )
    }
  }
}
