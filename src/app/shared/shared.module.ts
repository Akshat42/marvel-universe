import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CardComponent} from './card/card.component';
import {HomeRoutingModule} from "../hero/home/home-routing.module";
import {DetailDataComponent} from "./detail-data/detail-data.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    DetailDataComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DetailDataComponent,
    CardComponent
  ],
})
export class SharedModule {
}
