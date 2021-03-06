import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {User, AuthenticationService} from '../auth/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
  hide = true;
  loginFormModel: FormGroup;

  constructor(private authService: AuthenticationService,
              private router: Router) {

    this.loginFormModel = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit(): void {
    const user: User = {username: this.loginFormModel.value.username, password: this.loginFormModel.value.password};
    this.authService.SignIn(user);
  }

  ngOnInit(): void {

  }



}
