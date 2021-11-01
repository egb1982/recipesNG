import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public searchTerm:string = "";

  constructor(private router: Router) { }

  clearFilter() {
    this.searchTerm = "";
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['recipes/']);
  }
}
