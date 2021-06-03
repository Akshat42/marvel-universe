import { Component, OnInit } from '@angular/core';
import {HeroDataService} from "../hero-data.service";

@Component({
  selector: 'mu-comic-container',
  templateUrl: './comic-container.component.html',
  styleUrls: ['./comic-container.component.scss']
})
export class ComicContainerComponent implements OnInit {

  constructor(private dataService: HeroDataService) {}

  ngOnInit(): void {
    this.dataService.getAllComics().subscribe(
      comicData => console.log(comicData)
    );
  }

}
