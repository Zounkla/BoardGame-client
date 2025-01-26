import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Credentials} from '../../model/platform/Credentials.model';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly url: string;

  private loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + "auth";
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  get loggedIn$() {
    return this.loggedInSubject.asObservable();
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  register(credentials: Credentials): Observable<string> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let payload = {
      username: credentials.username,
      password: credentials.password
    };
    return this.http.post<string>(this.url + "/register", payload, {headers}).pipe(
      tap(token => {
        localStorage.setItem('authToken', token);
        this.loggedInSubject.next(true);
      })
    )
  }

  login(credentials: Credentials): Observable<string>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let payload = {
      username: credentials.username,
      password: credentials.password
    };
    return this.http.post<string>(this.url + "/login", payload, {headers, responseType: 'text' as 'json' }).pipe(
      tap(token => {
        localStorage.setItem('authToken', token);
        this.loggedInSubject.next(true);
      })
    )
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.loggedInSubject.next(false);
  }
}
