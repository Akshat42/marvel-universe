import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopularContainerComponent} from './popular/popular-container/popular-container.component';
import {HomeContainerComponent} from "./home/home-container/home-container.component";
import {SharedModule} from "../shared/shared.module";
import {HeaderComponent} from "../shared/header/header.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ]
})
export class HeroModule {
}
