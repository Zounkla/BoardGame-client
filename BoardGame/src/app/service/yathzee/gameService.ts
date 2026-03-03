import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import {YathzeeGame} from '../../model/yathzee/YathzeeGame.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private currentGameSubject = new BehaviorSubject<YathzeeGame | null>(null);
  currentGame$ = this.currentGameSubject.asObservable();

  setCurrentGame(game: YathzeeGame) {
    this.currentGameSubject.next(game);
  }

  getCurrentGame(): YathzeeGame | null {
    return this.currentGameSubject.value;
  }
}
