import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ComicDataService} from "../comic-data.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {Comic} from "../../model/comic";
import {UtilService} from "../../service/util.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'mu-comic-detail-container',
  templateUrl: './comic-detail-container.component.html',
  styleUrls: ['./comic-detail-container.component.scss']
})
export class ComicDetailContainerComponent implements OnInit {

  constructor(private comicDataService: ComicDataService,
              private activatedRoute: ActivatedRoute,
              @Inject(LOCALE_ID) private locale: string
  ) {
  }

  utilService = new UtilService();
  comicId: number = 0;

  currentComicData: Comic = {description: "", id: 0, imageUrl: "", modified: "", name: ""}
  error: any = "";

  ngOnInit(): void {
    this.comicId = this.activatedRoute.snapshot.params['id'];
    this.comicDataService.getComic(this.comicId).pipe(
      map(
        rawComicData => <Comic>{
          id: rawComicData.id,
          name: rawComicData.name,
          description: rawComicData.description || "No Description Found :(",
          modified: "Last Modified: " + formatDate(rawComicData.modified, 'MMMM d, y', this.locale) || "Not Available",
          imageUrl: rawComicData.thumbnail.path + "." + rawComicData.thumbnail.extension
        }
      )
    ).subscribe(
      currentComicData => {
        this.currentComicData = currentComicData;
        this.utilService.hideLoader();
      },
      errorResponse => {
        this.error = errorResponse.error.status;
        this.utilService.hideLoader();
      }
    )
  }


}
