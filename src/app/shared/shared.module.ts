import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CardComponent} from './card/card.component';
import {DetailContainerComponent} from './detail/detail-container/detail-container.component';
import {HomeRoutingModule} from "../hero/home/home-routing.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    DetailContainerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent
  ],
})
export class SharedModule {
}
