import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>{{title}}</h1>
  <h2>Heroes : {{myHero}} </h2>
  <ul>
  <li *ngFor="let hero of heroes">
  {{ hero }}
</li>
</ul>
 
  `
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = ['Black Panther', 'Spiderman']
  myHero = this.heroes[0];
}
