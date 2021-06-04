import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeContainerComponent} from './home-container/home-container.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    HomeContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {
}
