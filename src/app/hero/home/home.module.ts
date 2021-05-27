import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeContainerComponent} from './home-container/home-container.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    HomeContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HomeModule {
}
