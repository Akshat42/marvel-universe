import {Component, OnInit} from '@angular/core';
import {HeroDataService} from "../../hero-data.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'mu-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  filterHero!: string;
  searchedString!: string;

  constructor(private heroDataService: HeroDataService, private router: Router, private route: ActivatedRoute) {
  }

  changeUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchedString
      },
      queryParamsHandling: "merge",
    });
  }

  allHeroes!: Observable<any>;

  ngOnInit(): void {
    this.getCharacters();

    this.route.queryParams.subscribe((params) => {
      this.searchedString = params.search;
      this.searchHeroes(this.searchedString);
    })
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

  searchHeroes(searchedValue: string) {
    this.searchedString = searchedValue;
    if (searchedValue === '') {
      this.getCharacters();
    } else {
      this.allHeroes = this.heroDataService.getFilteredHeroes(searchedValue);
    }
    this.changeUrl();
  }
}
