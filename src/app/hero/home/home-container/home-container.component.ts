import {Component, OnInit} from '@angular/core';
import {HeroDataService} from "../../hero-data.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'mu-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  filterHero!: string;
    constructor(private heroDataService: HeroDataService, private router: Router) {
  }

  allHeroes!: Observable<any>;

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    this.allHeroes = this.heroDataService.getAllHeroes();
  }

  sortHeroes() {
    if (this.filterHero !== '') {
      this.allHeroes = this.heroDataService.getFilteredHeroesSortedByName(this.filterHero);
    }
    this.allHeroes = this.heroDataService.getHeroesSortedByName();
  }

  searchHeroes(event: any) {
    if (event.value === '') {
      this.getCharacters();
    } else {
      this.allHeroes = this.heroDataService.getFilteredHeroes(event.value);
    }
  }
}
