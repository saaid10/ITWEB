import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import WorkoutProgram from '../shared/models/WorkoutProgram';



@Component({
  selector: 'app-addprogram',
  templateUrl: './addprogram.component.html',
  styleUrls: ['./addprogram.component.scss']
})
export class AddprogramComponent implements OnInit {

  value = '';

  constructor(private route: Router,
              private http: HttpClient) { }


  ngOnInit(): void {
  }

  public submit(): void {
    const program123 = new WorkoutProgram(this.value, [], '');
    this.http.post('/api/programs', {program: program123}).subscribe((s) => this.route.navigateByUrl(''));
  }

}
