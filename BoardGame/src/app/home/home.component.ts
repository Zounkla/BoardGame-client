import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/platform/authentication.service';
import {Subscription} from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  logged: boolean = false;
  private authStatusSubscription!: Subscription;

  constructor(
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.authStatusSubscription = this.authenticationService.loggedIn$.subscribe(
      (isLoggedIn) => {
        this.logged = isLoggedIn;
      }
    );
  }

  logout() {
    this.authenticationService.logout();
  }
}
