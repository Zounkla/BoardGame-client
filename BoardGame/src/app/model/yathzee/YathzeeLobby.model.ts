import {YathzeePlayer} from './YathzeePlayer.model';
import {YathzeeGame} from './YathzeeGame.model';

export interface YathzeeLobby {
  id: number;
  name: string;
  players: YathzeePlayer[];
  game: YathzeeGame;
  maxPlayers: number;
  inGame: boolean;
  status: string;
}
