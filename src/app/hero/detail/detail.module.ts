import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailContainerComponent} from './detail-container/detail-container.component';
import {SharedModule} from "../../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    DetailContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ]
})
export class DetailModule {
}
