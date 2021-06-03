import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicListContainerComponent } from './comic-list-container/comic-list-container.component';
import {SharedModule} from "../shared/shared.module";
import {AppRoutingModule} from "../app-routing.module";
import { ComicDetailContainerComponent } from './comic-detail-container/comic-detail-container.component';
import { ComicDataComponent } from './comic-data/comic-data.component';



@NgModule({
  declarations: [
    ComicListContainerComponent,
    ComicDetailContainerComponent,
    ComicDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class ComicModule { }
