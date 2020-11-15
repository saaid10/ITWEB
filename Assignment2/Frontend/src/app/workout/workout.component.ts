import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import WorkoutProgram from '../shared/models/WorkoutProgram';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  constructor(private http: HttpClient) { }
  programs: WorkoutProgram[] = [];
  ngOnInit(): void {
    this.http.get<ProgramApi>('/api/programs').subscribe((s) => this.programs = s.workoutPrograms);
  }

  details(id: string): void {
    console.log(id);
  }

  addWorkout(program: WorkoutProgram): void {
    console.log(program);
  }
}

interface ProgramApi {
  workoutPrograms: WorkoutProgram[];
}
