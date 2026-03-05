import {Injectable, NgZone} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { YathzeeGame } from '../../model/yathzee/YathzeeGame.model';
import {YathzeeLobby} from '../../model/yathzee/YathzeeLobby.model';

@Injectable({
  providedIn: 'root'
})
export class YathzeeService {

  private readonly gameUrl = environment.apiUrl + "yathzee";
  private readonly lobbyUrl = environment.apiUrl + "lobbies/yathzee";

  constructor(private http: HttpClient, private ngZone: NgZone) {}

  getGame(id: string) {
    return this.http.get<YathzeeGame>(`${this.gameUrl}/${id}`);
  }

  rollDices(gameId: number, diceIndexes: number[]) {
    return this.http.post<YathzeeGame>(
      `${this.gameUrl}/${gameId}/roll`,
      { diceIndexes }
    );
  }

  chooseBonus(gameId: number, bonusIndex: number) {
    return this.http.post<number>(
      `${this.gameUrl}/${gameId}/choose/${bonusIndex}`,
      {}
    );
  }

  subscribeToGameUpdates(id: string): Observable<YathzeeGame> {
    const token = localStorage.getItem('authToken');

    return new Observable<YathzeeGame>((observer) => {
      const eventSource = new EventSource(
        `${this.gameUrl}/${id}/stream?token=${token}`
      );

      eventSource.addEventListener('game-update', (event: MessageEvent) => {
        this.ngZone.run(() => {
          observer.next(JSON.parse(event.data));
        });
      });

      eventSource.onerror = (error) => {
        eventSource.close();
        observer.error(error);
      };

      return () => eventSource.close();
    });
  }

  /* ==========================
     LOBBY
  ========================== */

  getAvailableLobbies() {
    return this.http.get<YathzeeLobby[]>(`${this.lobbyUrl}/available`);
  }
  getLobby(id: number) {
    return this.http.get<YathzeeLobby>(`${this.lobbyUrl}/${id}`);
  }

  createLobby(name: string, maxPlayers: number) {
    return this.http.post<YathzeeLobby>(
      `${this.lobbyUrl}/create?name=${name}&maxPlayers=${maxPlayers}`,
      {}
    );
  }

  joinLobby(id: number) {
    return this.http.post<YathzeeLobby>(
      `${this.lobbyUrl}/${id}/join`,
      {}
    );
  }

  startGame(id: number) {
    return this.http.post<YathzeeGame>(
      `${this.lobbyUrl}/${id}/start`,
      {}
    );
  }

  subscribeToLobbyUpdates(id: number): Observable<YathzeeLobby> {
    const token = localStorage.getItem('authToken');
    return new Observable<YathzeeLobby>(observer => {
      const evtSource = new EventSource(`${this.lobbyUrl}/${id}/stream?token=${token}`);

      evtSource.addEventListener('lobby-update', (event: MessageEvent) => {
        this.ngZone.run(() => {
          observer.next(JSON.parse(event.data));
        });
      });

      evtSource.onerror = (err) => {
        console.error('Lobby SSE error:', err);
        evtSource.close();
        observer.error(err);
      };

      return () => evtSource.close();
    });
  }
}
