import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
  hide = true;
  loginFormModel: FormGroup;


  constructor() {
    this.loginFormModel = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    })
  }

  onSubmit(): void {
    console.log(this.loginFormModel.value)
  }

  ngOnInit(): void {

  }

}
