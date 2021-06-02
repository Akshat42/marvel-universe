import {Component, OnInit} from '@angular/core';
import {HeroDataService} from "../../hero-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../../../service/util.service";
import {Card} from "../../../model/card"

@Component({
  selector: 'mu-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  searchedString: string = '';
  inputValue!: string;

  constructor(private _heroDataService: HeroDataService, private _utilService: UtilService, private _router: Router, private _route: ActivatedRoute) {
  }

  changeUrl(searchString: string) {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        search: searchString
      },
      queryParamsHandling: "merge",
    });
  }

  allHeroes!: Card[];

  ngOnInit(): void {
    this.getCharacters();
    this._route.queryParams.subscribe((params) => {
        if (this.inputValue === '') {
          this.getCharacters();
        } else {
          this.inputValue = params.search;
          this.searchHeroes(this.inputValue);
        }
      }
    )
  }

  getHeroDetail(heroId: number){
    this._router.navigate([`./detail/${heroId}`])
  }

  getHeroDetails(heroes: any) {
    this.allHeroes = [];
    heroes.forEach((hero: any) => {
      this.allHeroes.push({
        imageUrl: hero.thumbnail.path + "." + hero.thumbnail.extension,
        cardName: hero.name,
        id: hero.id
      });
    });
    this._utilService.hideLoader();
  }

  getCharacters() {
    this._heroDataService.getAllHeroes().subscribe(heroes => {
        this.getHeroDetails(heroes);
      },
      error => console.log(error)
    );
  }


  sortHeroes() {
    this._heroDataService.getHeroesSortedByName().subscribe(heroes => {
        this.getHeroDetails(heroes);
      },
      error =>  console.log(error)
    );
  }

  searchHeroes(searchedValue: string) {
    this.searchedString = searchedValue;
    if (searchedValue === '') {
      this.getCharacters();
    } else {
      this._heroDataService.getFilteredHeroes(searchedValue).subscribe(heroes => {
          this.getHeroDetails(heroes);
        },
        error => console.log(error)
      );
      this.changeUrl(searchedValue);
    }
  }
}
