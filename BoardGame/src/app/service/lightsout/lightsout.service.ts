import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';
import {LightsoutGame} from '../../model/lightsout/LightsoutGame.model';

@Injectable({
  providedIn: 'root'
})
export class LightsoutService {
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + "lightsout";
  }

  getGame(id: string) {
    return this.http.get<LightsoutGame>(this.url + "/" + id);
  }

  click(game: LightsoutGame, x: number, y: number) {
    let body = {
      gameId: game.id,
      x: x,
      y: y
    }
    return this.http.post<LightsoutGame>(this.url + "/click", body)
  }
}
