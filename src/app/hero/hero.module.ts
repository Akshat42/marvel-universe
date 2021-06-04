import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {DetailModule} from "./detail/detail.module";
import {HomeModule} from "./home/home.module";
import {PopularModule} from "./popular/popular.module";



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    DetailModule,
    HomeModule,
    PopularModule
  ]
})
export class HeroModule {
}
