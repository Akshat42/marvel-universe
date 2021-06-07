import {Component, OnInit} from '@angular/core';
import {HeroDataService} from "../../hero-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../../../service/util.service";
import {Card} from "../../../model/card"
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'mu-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  inputValue!: string;
  searchedString: string = '';
  addIconClicked: boolean = false;
  heroForm!: FormGroup;
  errorMessages = {
    heroId: {
      'required': 'Hero ID is required',
    },
    heroName: {
      'required': 'Hero Name is required',
    },
    heroDescription: {
      'required': 'Hero Description is required'
    }
  };
  displayHeroIdErrorMessage: string = '';
  displayHeroNameErrorMessage: string = '';

  constructor(private _heroDataService: HeroDataService, private _utilService: UtilService, private _router: Router, private _route: ActivatedRoute, private _formBuilder: FormBuilder) {
  }

  allHeroes!: Card[];

  ngOnInit(): void {
    this.getCharacters();

    this._route.queryParams.subscribe((params) => {
      this.inputValue = params.search;
      if(this.inputValue!=='') {
        this._heroDataService.getFilteredHeroes(this.inputValue).subscribe(heroes => {
            this.getHeroDetails(heroes);
          },
          error => console.log(error)
        );
      }
      else{
        this.getCharacters();
      }
    });

    this.heroForm = this._formBuilder.group({
      heroId: [0, [Validators.required]],
      heroName: ['', [Validators.required]]
    });

    const heroIdControl = this.heroForm.get('heroId');
    heroIdControl?.valueChanges.subscribe(
      value => this.setHeroIdMessage(heroIdControl)
    );
    const heroNameControl = this.heroForm.get('heroName');
    heroNameControl?.valueChanges.subscribe(
      value => this.setHeroNameMessage(heroNameControl)
    );
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

  getHeroDetail(heroId: number) {
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
      error => console.log(error)
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

  buttonClicked(): boolean {
    this.addIconClicked = true;
    return this.addIconClicked;
  }

  onSubmit() {
    if (!this.heroForm.get('heroId')?.errors && !this.heroForm.get('heroName')?.errors) {
      let heroDetails: Card = {
        id: this.heroForm.get('heroId')?.value,
        cardName: this.heroForm.get('heroName')?.value,
        imageUrl: '../../../../assets/images/heroImage.jpg'
      }
      this.allHeroes.unshift(heroDetails);
      this.removeForm();
    }
  }

  removeForm() {
    this.addIconClicked = false;
  }

  setHeroIdMessage(control: AbstractControl) {
    this.displayHeroIdErrorMessage = '';
    if ((control.touched || control.dirty) && control.errors) {
      this.displayHeroIdErrorMessage = Object.keys(control.errors).map(key => (<any>this.errorMessages.heroId)[key]).join(' ');
    }
  }

  setHeroNameMessage(control: AbstractControl) {
    this.displayHeroNameErrorMessage = '';
    if ((control.touched || control.dirty) && control.errors) {
      this.displayHeroNameErrorMessage = Object.keys(control.errors).map(key => (<any>this.errorMessages.heroName)[key]).join(' ');
    }
  }
}
