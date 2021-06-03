import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {DetailModule} from "./detail/detail.module";



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    DetailModule
  ]
})
export class HeroModule {
}
