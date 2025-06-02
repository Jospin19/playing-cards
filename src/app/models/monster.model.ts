import { MonsterType } from "../utils/monster.utils";

export class Monster{
    name: string = "Monster";
    image: string = "img/pik.jpg";
    type: MonsterType = MonsterType.ELECTRIC;
    hp: number = 60;
    figCaption: string = "N°001 Monster";

    attackName: string = "Standard Attack";
    attackStrength: number = 10;
    attackDescription: string = "A standard attack that deals damage to the opponent.";
}