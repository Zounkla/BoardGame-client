import {YathzeeBonusLabel} from './YathzeeBonus.labels';

export interface YathzeeBonusPreview {
  bonusIndex: number;
  bonusName: string;
  label: YathzeeBonusLabel;
  alreadyChosen: boolean;
  potentialScore: number;
}
