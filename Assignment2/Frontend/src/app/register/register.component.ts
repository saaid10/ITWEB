import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { User, AuthenticationService } from '../auth/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})


export class RegisterComponent implements OnInit {
  hide = true;
  loginFormModel: FormGroup;


  constructor(private authService: AuthenticationService) {

    this.loginFormModel = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  onSubmit(): void {
    const user: User = {
      username: this.loginFormModel.value.username,
      password: this.loginFormModel.value.password,
      confirmPassword: this.loginFormModel.value.confirmPassword
    };
    if (user.password !== user.confirmPassword) { return; }
    this.authService.register(user);
  }

  ngOnInit(): void {

  }

}
