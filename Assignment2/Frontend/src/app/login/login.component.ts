import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { User, AuthenticationService } from '../auth/auth-service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
  authService?: AuthenticationService;
  hide = true;
  loginFormModel: FormGroup;


  constructor(authService: AuthenticationService) {
    this.authService = authService;

    this.loginFormModel = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    })
  }

  onSubmit(): void {
    let user: User = { username: this.loginFormModel.value.username, password: this.loginFormModel.value.password }
    this.authService?.signIn(user);
  }

  ngOnInit(): void {

  }

}
