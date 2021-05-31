import {Component, OnInit} from '@angular/core';
import {HeroDataService} from "../../hero-data.service";
import {Hero} from "../../../model/hero";
import loader from "@angular-devkit/build-angular/src/webpack/plugins/single-test-transform";
import {UtilService} from "../../../service/util.service";


@Component({
  selector: 'mu-popular-container',
  templateUrl: './popular-container.component.html',
  styleUrls: ['./popular-container.component.scss']
})
export class PopularContainerComponent implements OnInit {

  heroes!: Hero[];
  loader: boolean = true;

  constructor(private heroDataService: HeroDataService,
              private utilService: UtilService
  ) {
  }

  ngOnInit(): void {
    this.heroDataService.getPopularHeroes()
      .subscribe(
        heroes => {
          this.heroes = [];
          heroes.forEach((hero: any) => {
            this.heroes.push({
              description: hero.description,
              id: hero.id,
              modified: hero.modified,
              name: hero.name,
              imageUrl: hero.thumbnail.path + "." + hero.thumbnail.extension
            });
          });
          this.utilService.hideLoader();
        },
        error => console.log(error)
      );
  }
}
