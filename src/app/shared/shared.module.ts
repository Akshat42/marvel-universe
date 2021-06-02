import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CardComponent} from './card/card.component';
import {HomeRoutingModule} from "../hero/home/home-routing.module";
import {DetailDataComponent} from "./detail-data/detail-data.component";
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    DetailDataComponent,
    LoaderComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule
    ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DetailDataComponent,
    LoaderComponent
  ],
})
export class SharedModule {
}
