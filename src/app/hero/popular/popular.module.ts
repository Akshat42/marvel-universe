import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopularContainerComponent} from "./popular-container/popular-container.component";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    PopularContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PopularModule { }
