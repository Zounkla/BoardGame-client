import {Injectable, NgZone} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { YathzeeGame } from '../../model/yathzee/YathzeeGame.model';

@Injectable({
  providedIn: 'root'
})
export class YathzeeService {

  private readonly url: string;

  constructor(private http: HttpClient, private ngZone: NgZone) {
    this.url = environment.apiUrl + "yathzee";
  }

  getGame(id: string) {
    return this.http.get<YathzeeGame>(this.url + "/" + id);
  }

  subscribeToGameUpdates(id: string): Observable<YathzeeGame> {
    const token = localStorage.getItem('authToken');
    return new Observable<YathzeeGame>((observer) => {
      const eventSource = new EventSource(`${this.url}/${id}/stream?token=${token}`);

      eventSource.addEventListener('game-update', (event: MessageEvent) => {
        this.ngZone.run(() => {
          const updatedGame: YathzeeGame = JSON.parse(event.data);
          observer.next(updatedGame);
        });
      });

      eventSource.onerror = (error) => {
        console.error('SSE error: ', error);
        eventSource.close();
        observer.error(error);
      };

      return () => {
        eventSource.close();
      };
    });
  }

}
