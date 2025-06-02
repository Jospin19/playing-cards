export enum MonsterType {
    PLANT = "plant",
    ELECTRIC = "electric",
    FiRE = "fire",
    WATER = "water",
}

export interface IMonsterProperties {
    imageUrl : string;
    color: string;
}

export const MonsterTypeProperties: {[key: string ]: IMonsterProperties} = {
    [MonsterType.PLANT]: {
		imageUrl: 'img/plant.png',
		color: 'rgba(135, 255, 124)'
	},
	[MonsterType.ELECTRIC]: {
		imageUrl: 'img/electric.jpg',
		color: 'rgb(255, 255, 104)'
	},
	[MonsterType.FiRE]: {
		imageUrl: 'img/fire.png',
		color: 'rgb(255, 104, 104)'
	},
	[MonsterType.WATER]: {
		imageUrl: 'img/water.jpg',
		color: 'rgba(118, 234, 255)'
	},
}