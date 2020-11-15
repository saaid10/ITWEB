import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import WorkoutProgram from '../shared/models/WorkoutProgram';
import {Router} from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  programs: WorkoutProgram[] = [];

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this.http.get<ProgramApi>('/api/programs').subscribe((s) => this.programs = s.workoutPrograms);
  }

  details(id: string): void {
    this.router.navigateByUrl('/programs/' + id);
  }

  addWorkout(id: string): void {
    this.router.navigateByUrl('/addWorkout/' + id);
  }
}

interface ProgramApi {
  workoutPrograms: WorkoutProgram[];
}
