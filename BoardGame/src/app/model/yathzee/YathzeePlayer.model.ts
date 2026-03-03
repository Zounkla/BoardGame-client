import {AppUser} from '../platform/AppUser.model';
import {YathzeePlayerBonus} from './YathzeePlayerBonus.model';

export interface YathzeePlayer {
  id: number;
  user: AppUser;
  score: number;
  bonuses: YathzeePlayerBonus[];
}
