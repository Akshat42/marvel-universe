import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    DetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
