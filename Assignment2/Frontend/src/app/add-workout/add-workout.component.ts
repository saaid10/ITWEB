import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import WorkoutProgram from '../shared/models/WorkoutProgram';
import {HttpClient} from '@angular/common/http';
import Workout from '../shared/models/Workout';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss']
})
export class AddWorkoutComponent implements OnInit {
  private programId: string | null = '';
  public program: WorkoutProgram | undefined;
  exercise = '';
  description = '';
  set: number | undefined;
  repsOrTime = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.programId = this.route.snapshot.paramMap.get('programId');
    this.http.get<ProgramApi>('/api/programs/' + this.programId).subscribe((s) => {
      if (s.workoutProgram.isPublic) {
        this.router.navigateByUrl('');
      }
      this.program = s.workoutProgram;
    });
  }

  submit(): void {
    const workout = new Workout(this.exercise, this.description, this.set || 0, this.repsOrTime, '');
    workout._id = undefined;
    this.program?.workouts.push(workout);
    this.http.put('/api/programs/' + this.programId, {program: this.program}).subscribe(
      (s) => this.router.navigateByUrl(''),
      (err) => this.router.navigateByUrl(''));
  }

}

interface ProgramApi {
  workoutProgram: WorkoutProgram;
}
