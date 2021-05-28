import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LoginComponent,
    PageNotFoundComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
