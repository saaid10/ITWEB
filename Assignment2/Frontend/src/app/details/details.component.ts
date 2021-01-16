import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Route, Router} from '@angular/router';
import WorkoutProgram from '../shared/models/WorkoutProgram';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private programId: string | null = '';
  public program: WorkoutProgram | undefined;

  constructor(private http: HttpClient,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.programId = this.route.snapshot.paramMap.get('programId');
    this.http.get<ProgramApi>('/api/programs/' + this.programId).subscribe((s) => this.program = s.workoutProgram);
  }

}

interface ProgramApi {
  workoutProgram: WorkoutProgram;
}
