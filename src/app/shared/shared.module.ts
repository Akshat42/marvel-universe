import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CardComponent} from './card/card.component';
import {HomeRoutingModule} from "../hero/home/home-routing.module";
import {DetailDataComponent} from "./detail-data/detail-data.component";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    DetailDataComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule
    ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DetailDataComponent
  ],
})
export class SharedModule {
}
