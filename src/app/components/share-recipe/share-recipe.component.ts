import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from "@angular/cdk/clipboard";

@Component({
  selector: 'app-share-recipe',
  templateUrl: './share-recipe.component.html',
  styleUrls: ['./share-recipe.component.scss']
})
export class ShareRecipeComponent implements OnInit {
  @Input() recipeId:string;

  constructor(private clipboard: Clipboard) { }

  url:string = window.location.href + '/view/';
  buttonText = "Copiar";

  ngOnInit(): void {
  }

  copyLink(){
    this.clipboard.copy(`${this.url}${this.recipeId}`);
    this.buttonText = "Copiado!";
  }

}
