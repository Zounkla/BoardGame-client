import {YathzeeBonusPreview} from './YathzeeBonusPreview.model';
import {YathzeePlayer} from './YathzeePlayer.model';

export interface YathzeeGame {
  id: number;
  players: YathzeePlayer[];
  activePlayer: YathzeePlayer | null | undefined;
  dices: number[];
  bonusPreviews: YathzeeBonusPreview[];
  remainingRolls: number;
  gameOver: boolean;
}
