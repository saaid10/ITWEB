import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddprogramComponent } from './addprogram/addprogram.component';
import { WorkoutComponent } from './workout/workout.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';
import { AddWorkoutComponent } from './add-workout/add-workout.component';

const routes: Routes = [
  { path: 'addworkout', component: WorkoutComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'addprogram', component: AddprogramComponent, canActivate: [AuthGuard] },
  { path: 'programs/:programId', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'addWorkout/:programId', component: AddWorkoutComponent, canActivate: [AuthGuard] },
  { path: '', component: WorkoutComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
