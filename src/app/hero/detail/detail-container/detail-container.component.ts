import { Component, OnInit } from '@angular/core';
import {map} from "rxjs/operators";
import {Hero} from "../../../model/hero";
import {HeroDataService} from "../../hero-data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'mu-detail-container',
  templateUrl: './detail-container.component.html',
  styleUrls: ['./detail-container.component.scss']
})
export class DetailContainerComponent implements OnInit {

  constructor(
    private heroDataService: HeroDataService,
    private activatedRoute: ActivatedRoute,
  ) { }

  currentHeroData:Hero = {description: "", id: 0, modified: "", name: "", imageUrl: "", votes: 0}

  ngOnInit(): void {
    let heroId = this.activatedRoute.snapshot.params['id'];
    this.heroDataService.getHeroDetail(heroId).pipe(
      map(
        (result) => <Hero>{
          id: result.id,
          name: result.name,
          description: result.description || "No Description Found :(",
          modified: result.modified,
          imageUrl: result.thumbnail.path+"."+result.thumbnail.extension
        }
      )
    ).subscribe(
      data => {
        this.currentHeroData = data;
      },
      error => console.log(error)
    );
  }
}
