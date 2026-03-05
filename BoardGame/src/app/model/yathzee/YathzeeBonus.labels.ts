export interface YathzeeBonusLabel {
  name: string;
  description?: string;
}

export const YATHZEE_BONUS_LABELS: Record<string, YathzeeBonusLabel> = {
  SUM_OF_ONE:    { name: 'Un',           description: 'Somme de tous les 1' },
  SUM_OF_TWO:    { name: 'Deux',         description: 'Somme de tous les 2' },
  SUM_OF_THREE:  { name: 'Trois',        description: 'Somme de tous les 3' },
  SUM_OF_FOUR:   { name: 'Quatre',       description: 'Somme de tous les 4' },
  SUM_OF_FIVE:   { name: 'Cinq',         description: 'Somme de tous les 5' },
  SUM_OF_SIX:    { name: 'Six',          description: 'Somme de tous les 6' },
  THREE_OF_KIND: { name: 'Brelan',       description: 'Somme de tous les dés' },
  FOUR_OF_KIND:  { name: 'Carré',        description: 'Somme de tous les dés' },
  FULL_HOUSE:    { name: 'Full',         description: '25 points' },
  SM_STRAIGHT:   { name: 'Petite suite', description: '30 points' },
  LG_STRAIGHT:   { name: 'Grande suite', description: '40 points' },
  YATHZEE:       { name: 'Yathzee !',   description: '50 points' },
  CHANCE:        { name: 'Chance',       description: 'Somme de tous les dés' },
  SIMPLE_BONUS: { name: 'Bonus', description: '+35 pts' }
};
