import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-recipe',
  templateUrl: './share-recipe.component.html',
  styleUrls: ['./share-recipe.component.scss']
})
export class ShareRecipeComponent implements OnInit {
  @Input() recipeId:string;

  constructor() { }

  url:string = window.location.href + '/view/';

  ngOnInit(): void {
  }

}
