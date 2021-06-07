import {Component, OnInit} from '@angular/core';
import {HeroDataService} from "../../hero/hero-data.service";
import {Card} from "../../model/card";
import {ComicDataService} from "../comic-data.service";
import {UtilService} from "../../service/util.service";

@Component({
  selector: 'mu-comic-list-container',
  templateUrl: './comic-list-container.component.html',
  styleUrls: ['./comic-list-container.component.scss']
})
export class ComicListContainerComponent implements OnInit {

  constructor(private comicDataService: ComicDataService,
              private utilService: UtilService
              ) {
  }

  comics: Card[] = [];

  ngOnInit(): void {
    this.comicDataService.getAllComics().subscribe(
      (comics) => {
        comics.forEach((comic: any) => {
          this.comics.push({
            imageUrl: comic.thumbnail.path + "." + comic.thumbnail.extension,
            cardName: comic.title,
            id: comic.id,
            description: ''
          })
        })
        this.utilService.hideLoader();
      }
    )
  }

}
