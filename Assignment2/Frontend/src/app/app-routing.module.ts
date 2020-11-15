import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddprogramComponent} from './addprogram/addprogram.component';
import {WorkoutComponent} from './workout/workout.component';
import {DetailsComponent} from './details/details.component';
import {AddWorkoutComponent} from './add-workout/add-workout.component';

const routes: Routes = [
  {path: 'addprogram', component: AddprogramComponent},
  {path: 'programs/:programId', component: DetailsComponent},
  {path: 'addWorkout/:programId', component: AddWorkoutComponent},
  {path: '', component: WorkoutComponent, pathMatch: 'full'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
