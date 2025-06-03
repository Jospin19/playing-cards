import { MonsterType } from '../../utils/monster.utils';
import { Monster } from './../../models/monster.model';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  monsters : Monster[] = [];
  currentIndex: number = 1;

  constructor() { 
    this.load();
  }

  private save() {
    sessionStorage.setItem('monsters', JSON.stringify(this.monsters));
  }

  private load() {
    const monstersData = sessionStorage.getItem('monsters');
    if (monstersData) {
      const loadedMonsters = JSON.parse(monstersData) as Monster[];
      this.monsters = loadedMonsters.map(m => {
        const monster = new Monster();
        Object.assign(monster, m);
        return monster;
      });
      this.currentIndex = Math.max(...this.monsters.map(m => m.id));
    }
    else {
      this.init();
      this.save();
    }
  }

  private init() {
    this.monsters = [];

    const monster1 = new Monster();
    monster1.id = this.currentIndex++;
    monster1.name = "Pik";
    monster1.hp = 40;
    monster1.figCaption = "N°002 Pik";
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.id = this.currentIndex++;
    monster2.name = "Car";
    monster2.image = "img/car.jpg";
    monster2.type = MonsterType.WATER;
    monster2.hp = 60;
    monster2.figCaption = "N°003 Car";
    this.monsters.push(monster2);


    const monster3 = new Monster();
    monster3.id = this.currentIndex++;
    monster3.name = "Bulb";
    monster3.image = "img/bulb.jpg";
    monster3.type = MonsterType.PLANT;
    monster3.hp = 60;
    monster3.figCaption = "N°004 Bulb";
    this.monsters.push(monster3);


    const monster4 = new Monster();
    monster4.id = this.currentIndex++;
    monster4.name = "sala";
    monster4.image = "img/sala.jpg";
    monster4.type = MonsterType.FiRE;
    monster4.hp = 60;
    monster4.figCaption = "N°005 Sala";
    this.monsters.push(monster4);
  }


  getAll() : Monster[]{
    return this.monsters.map(monster => monster.copy());
  }

  get(id: number): Monster | undefined {
    const monster = this.monsters.find(m => m.id === id);
    return monster? monster.copy() : undefined;
  }

  add(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    monsterCopy.id = this.currentIndex;
    this.monsters.push(monsterCopy.copy());
    this.currentIndex++;
    this.save();
    return monsterCopy;
  }

  update(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    const monsterIndex = this.monsters.findIndex(m => m.id === monsterCopy.id);

    if(monsterIndex !== -1) {
      this.monsters[monsterIndex] = monsterCopy.copy();
      this.save();
    }
    return monsterCopy;
  }

  delete(id: number){
    const monsterIndex = this.monsters.findIndex(m => m.id === id);
    if (monsterIndex !== -1) {
      this.monsters.splice(monsterIndex, 1);
      this.save();
    }
  }
}
