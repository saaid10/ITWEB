import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  constructor() { }
  workoutcards = ["test1","test2","test3"]
  ngOnInit(): void {
  }

}
