import { Component, computed, inject, model, signal } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { CommonModule } from '@angular/common';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-monster-list',
  imports: [CommonModule, PlayingCardComponent, SearchBarComponent, MatButtonModule],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {
  private monsterService = inject(MonsterService);
  private router = inject(Router);

  monsters = signal<Monster[]>([]);
  search = model<string>('');

  filteredMonsters = computed(() => {
    return this.monsters().filter(monster => monster.name.includes(this.search()));
  });

  constructor() {
    this.monsters.set(this.monsterService.getAll());
  }

  addMonster() {
    this.router.navigate(['monster']);
  }

  openMonster(monster: Monster) {
    this.router.navigate(['monster', monster.id]);
  }
}
