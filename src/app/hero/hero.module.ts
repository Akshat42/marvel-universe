import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularContainerComponent } from './popular/popular-container/popular-container.component';
import {HomeContainerComponent} from "./home/home-container/home-container.component";



@NgModule({
  declarations: [
    PopularContainerComponent,
    HomeContainerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HeroModule { }
