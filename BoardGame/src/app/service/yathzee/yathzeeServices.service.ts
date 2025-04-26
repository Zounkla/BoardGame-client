import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { YathzeeGame } from '../../model/yathzee/YathzeeGame.model';

@Injectable({
  providedIn: 'root'
})
export class YathzeeService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + "yathzee/";
  }
  getGame(id: string) {
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
    return this.http.get<YathzeeGame>(this.url + id, {headers});
  }
}