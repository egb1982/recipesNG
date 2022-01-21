import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { ModalNewRecipeComponent } from '../modal-new-recipe/modal-new-recipe.component';
import { ModalUserLoginComponent } from '../modal-user-login/modal-user-login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Output() public searchDone: EventEmitter<string> = new EventEmitter();

  constructor(
    private recipesService: RecipesService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  openModalNewRecipe() {
    this.modalService.open(ModalNewRecipeComponent);
  }

  openModalUser() {
    this.modalService.open(ModalUserLoginComponent);
  }

  recipeSearch(searchTerm) {
    if (searchTerm !== '') {
      this.recipesService.getFilteredRecipes(searchTerm).subscribe(
        (res) => {
          this.recipesService.updateSearchResults(res);
          this.searchDone.emit(searchTerm);
        },
        (err) => console.log(err)
      );
    } else {
      this.recipesService.getRecipes().subscribe(
        (res) => this.recipesService.updateSearchResults(res),
        (err) => console.log(err)
      );
    }
  }
}
