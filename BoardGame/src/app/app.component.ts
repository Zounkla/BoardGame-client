import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
import {jwtDecode} from 'jwt-decode';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgToastModule, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BoardGame';

  getUserName() {
    return jwtDecode(<string>localStorage.getItem("authToken")).sub;
  }

  logout() {
    localStorage.removeItem("authToken");
  }

  isLogged() {
    return localStorage.getItem("authToken") != null;
  }

}

