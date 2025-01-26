import { Component } from '@angular/core';
import {Credentials} from '../model/platform/Credentials.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/platform/authentication.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  credentials: Credentials = { username: '', password: '' };
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  registerForm = new FormGroup({
    nickname : new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  onSubmit() {
    this.credentials!.username = this.registerForm.value.nickname ?? "";
    this.credentials!.password = this.registerForm.value.password ?? "";
    let confirm = this.registerForm.value.confirmPassword ?? "";
    if (this.credentials.password != confirm) {
      return
    }
    this.authenticationService.register(this.credentials).subscribe(
      () => {
        this.router.navigate(["/"])
      }
    );
  }

}
