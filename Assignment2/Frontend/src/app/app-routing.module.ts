import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddprogramComponent } from './addprogram/addprogram.component';
import { WorkoutComponent } from './workout/workout.component';

const routes: Routes = [
  { path: 'addprogram', component: AddprogramComponent}
  ,
  { path: 'addworkout', component: WorkoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
