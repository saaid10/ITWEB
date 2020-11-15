import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { User, AuthenticationService } from '../auth/auth-service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
  authService?: AuthenticationService;
  hide = true;
  loginFormModel: FormGroup;


  constructor(authService: AuthenticationService,
              private router: Router) {
    this.authService = authService;

    this.loginFormModel = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    })
  }

  onSubmit(): void {
    console.log(this.loginFormModel.value);
    let user: User = { username: this.loginFormModel.value.username, password: this.loginFormModel.value.password }
    this.authService?.SignIn(user);
    console.log(this.authService)
  }

  ngOnInit(): void {

  }

}
