import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeContainerComponent} from './home-container/home-container.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomeContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class HomeModule {
}
