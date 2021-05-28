import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailContainerComponent} from './detail-container/detail-container.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    DetailContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DetailModule {
}
