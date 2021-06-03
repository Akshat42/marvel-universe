import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {DetailModule} from "./detail/detail.module";
import { ComicContainerComponent } from './comic-container/comic-container.component';



@NgModule({
  declarations: [
    ComicContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DetailModule
  ]
})
export class HeroModule {
}
