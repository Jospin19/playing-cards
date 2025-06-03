import { MonsterService } from './services/monster/monster.service';
import { Monster } from './models/monster.model';
import { Component, computed, effect, inject, model, signal } from '@angular/core';
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
  monsterService = inject(MonsterService);

  monsters = signal<Monster[]>([]);
  search = model<string>('');

  filteredMonsters = computed(() => {
    return this.monsters().filter(monster => monster.name.includes(this.search()));
  });

  constructor() {
    this.monsters.set(this.monsterService.getAll());
  }

  addMonster() {
    const genericMonster = new Monster();
    this.monsterService.add(genericMonster);
    this.monsters.set(this.monsterService.getAll());
  }
}
