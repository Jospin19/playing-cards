import { Monster } from './../../models/monster.model';
import { MonsterType, MonsterTypeProperties } from './../../utils/monster.utils';
import { Component, computed, Input, input, InputSignal, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.css'
})
export class PlayingCardComponent{
  monster = input(new Monster());

  monsterTypeIcon = computed(() => {
    return MonsterTypeProperties[this.monster().type].imageUrl;
  });

  backgroundColor = computed(() => {
    return MonsterTypeProperties[this.monster().type].color;}
  );
}





