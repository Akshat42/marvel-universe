import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopularContainerComponent} from "./popular-container/popular-container.component";
import {SharedModule} from "../../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    PopularContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule
  ]
})
export class PopularModule {
}
