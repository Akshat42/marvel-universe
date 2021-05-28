import {Component, OnInit} from '@angular/core';
import {HeroDataService} from "../../../hero/hero-data.service";
import {ActivatedRoute} from "@angular/router";
import {Hero} from "../../../model/hero";

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
    this.heroDataService.getHeroDetail(heroId).subscribe(
      heroData => {
        this.heroData = heroData;
        console.log(heroData)
      },
      error => console.log(error)
    )
  }
}
