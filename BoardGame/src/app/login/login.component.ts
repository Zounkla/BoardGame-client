import { Component } from '@angular/core';
import {Credentials} from '../model/platform/Credentials.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/platform/authentication.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials: Credentials = { username: '', password: '' };
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  loginForm = new FormGroup({
    nickname : new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    this.credentials!.username = this.loginForm.value.nickname ?? "";
    this.credentials!.password = this.loginForm.value.password ?? "";
    this.authenticationService.login(this.credentials).subscribe(
      () => {
        this.router.navigate(["/"])
      }
    );
  }
}
