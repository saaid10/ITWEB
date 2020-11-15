import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { signOut } from './auth/auth-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(private route: Router) { }

  workoutcards = ["test1","test2","test3"]
  title = 'Frontend';

  signOut = () => {
    signOut();
  }
}
