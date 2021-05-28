import {Component, OnInit} from '@angular/core';
import {Hero} from "../../model/hero";
import {map} from "rxjs/operators";
import {HeroDataService} from "../../hero/hero-data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'mu-detail-data',
  templateUrl: './detail-data.component.html',
  styleUrls: ['./detail-data.component.scss']
})
export class DetailDataComponent implements OnInit {

  constructor(
    private heroDataService: HeroDataService,
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
