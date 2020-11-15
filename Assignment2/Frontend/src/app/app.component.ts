import { Component } from '@angular/core';
import {AuthenticationService} from './auth/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private auth: AuthenticationService) { }

  title = 'Frontend';

  signOut() {
    this.auth.SignOut();
  }
}
