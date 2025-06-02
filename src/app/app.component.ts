import { Monster } from './models/monster.model';
import { Component, computed, effect, model, signal } from '@angular/core';
import { PlayingCardComponent } from "./components/playing-card/playing-card.component";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, PlayingCardComponent, SearchBarComponent]
})
export class AppComponent {
  monsters!: Monster[];
  search = model<string>('');

  filteredMonsters = computed(() => {
    return this.monsters.filter(monster => monster.name.includes(this.search()));
  });

  constructor() {

    this.monsters = [];

    const monster1 = new Monster();
    monster1.name = "Pik";
    monster1.hp = 40;
    monster1.figCaption = "N°002 Pik";
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.name = "Car";
    monster2.image = "img/car.jpg";
    monster2.type = MonsterType.WATER;
    monster2.hp = 60;
    monster2.figCaption = "N°003 Car";
    this.monsters.push(monster2);


    const monster3 = new Monster();
    monster3.name = "Bulb";
    monster3.image = "img/bulb.jpg";
    monster3.type = MonsterType.PLANT;
    monster3.hp = 60;
    monster3.figCaption = "N°004 Bulb";
    this.monsters.push(monster3);


    const monster4 = new Monster();
    monster4.name = "sala";
    monster4.image = "img/sala.jpg";
    monster4.type = MonsterType.FiRE;
    monster4.hp = 60;
    monster4.figCaption = "N°005 Sala";
    this.monsters.push(monster4);
  }
}
