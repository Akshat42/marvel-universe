import {Component, OnInit} from '@angular/core';
import {HeroDataService} from "../../hero-data.service";
import {Hero} from "../../../model/hero";
import {map, tap} from "rxjs/operators";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'mu-popular-container',
  templateUrl: './popular-container.component.html',
  styleUrls: ['./popular-container.component.scss']
})
export class PopularContainerComponent implements OnInit {

  heroes: Hero[] = []

  constructor(private heroDataService: HeroDataService) {
  }

  ngOnInit(): void {
    this.heroDataService.getPopularHeroes()
      .subscribe(
        heroes => {
          heroes.forEach((hero: any) => {
            this.heroes.push({
              description: hero.description,
              id: hero.id,
              modified: hero.modified,
              name: hero.name,
              thumbnail: {
                path: hero.thumbnail.path,
                extension: hero.thumbnail.extension
              }
            });
          });
        },
        error => console.log(error)
      );
  }

}
