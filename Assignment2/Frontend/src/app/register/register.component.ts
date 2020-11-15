import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { User, AuthenticationService } from '../auth/auth-service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})


export class RegisterComponent implements OnInit {
  authService?: AuthenticationService;
  hide = true;
  loginFormModel: FormGroup;


  constructor(authService: AuthenticationService) {
    this.authService = authService;

    this.loginFormModel = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    })
  }

  onSubmit(): void {
    let user: User = {
      username: this.loginFormModel.value.username,
      password: this.loginFormModel.value.password,
      confirmPassword: this.loginFormModel.value.confirmPassword
    }
    this.authService?.register(user);
    console.log(this.authService)
  }

  ngOnInit(): void {

  }

}
