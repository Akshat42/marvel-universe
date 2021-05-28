import {Component, OnInit} from '@angular/core';
import {HeroDataService} from "../../../hero/hero-data.service";
import {ActivatedRoute} from "@angular/router";
import {Hero} from "../../../model/hero";
import {map} from "rxjs/operators";

@Component({
  selector: 'mu-detail-container',
  templateUrl: './detail-container.component.html',
  styleUrls: ['./detail-container.component.scss']
})
export class DetailContainerComponent implements OnInit {

  constructor(private heroDataService: HeroDataService,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  heroData!: Hero;

  ngOnInit(): void {
    let heroId = this.activatedRoute.snapshot.params['id'];
    this.heroDataService.getHeroDetail(heroId).pipe(
      map(
        (result) => <Hero>{
          id: result.id,
          name: result.name,
          description: result.description,
          modified: result.modified,
          thumbnail: {
            extension: result.thumbnail.extension,
            path: result.thumbnail.path,
          }
        }
      )
    ).subscribe(
      data => {
        this.heroData = data;
      },
      error => console.log(error)
    )
  }
}
