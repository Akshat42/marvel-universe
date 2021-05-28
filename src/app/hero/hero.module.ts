import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopularContainerComponent} from './popular/popular-container/popular-container.component';
import {HomeContainerComponent} from "./home/home-container/home-container.component";
import {SharedModule} from "../shared/shared.module";
import {HeaderComponent} from "../shared/header/header.component";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HeroModule {
}
