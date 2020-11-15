import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddprogramComponent } from './addprogram/addprogram.component';
import { WorkoutComponent } from './workout/workout.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthenticationService } from './auth/auth-service';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'addprogram', component: AddprogramComponent, canActivate: [AuthGuard] },
  { path: 'addworkout', component: WorkoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
