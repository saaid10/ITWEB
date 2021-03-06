import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { NgMaterialIconModule } from 'ng-material-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddprogramComponent } from './addprogram/addprogram.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { WorkoutComponent } from './workout/workout.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


import { AuthInterceptor } from './auth/auth-intercepter';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import { AddWorkoutComponent } from './add-workout/add-workout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddprogramComponent,
    WorkoutComponent,
    RegisterComponent,
    DetailsComponent,
    AddWorkoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialIconModule,
    MatCardModule,
    MatButtonModule,

    HttpClientModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
