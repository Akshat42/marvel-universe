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
    heroName: {
      'required': 'Hero Name is required',
    },
    heroDescription: {
      'required': 'Hero Description is required'
    }
  };
  displayHeroDescErrorMessage: string = '';
  displayHeroNameErrorMessage: string = '';

  constructor(private _heroDataService: HeroDataService, private _utilService: UtilService, private _router: Router, private _route: ActivatedRoute, private _formBuilder: FormBuilder) {
  }

  allHeroes!: Card[];

  ngOnInit(): void {
    this.getCharacters();

    this._route.queryParams.subscribe((params) => {
      this.inputValue = params.search;
      if (this.inputValue !== '') {
        this._heroDataService.getFilteredHeroes(this.inputValue).subscribe(heroes => {
            this.getHeroDetails(heroes);
          },
          error => console.log(error)
        );
      } else {
        this.getCharacters();
      }
    });

    this.heroForm = this._formBuilder.group({
      heroName: ['', [Validators.required]],
      heroDescription: [0, [Validators.required]]
    });

    const heroDescControl = this.heroForm.get('heroDescription');
    heroDescControl?.valueChanges.subscribe(
      value => this.setHeroIdMessage(heroDescControl)
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
        id: hero.id,
        description: ''
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
        id: Math.floor((Math.random() * 100) + 1),
        cardName: this.heroForm.get('heroName')?.value,
        description: this.heroForm.get('heroDescription')?.value,
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
    this.displayHeroDescErrorMessage = '';
    if ((control.touched || control.dirty) && control.errors) {
      this.displayHeroDescErrorMessage = Object.keys(control.errors).map(key => (<any>this.errorMessages.heroDescription)[key]).join(' ');
    }
  }

  setHeroNameMessage(control: AbstractControl) {
    this.displayHeroNameErrorMessage = '';
    if ((control.touched || control.dirty) && control.errors) {
      this.displayHeroNameErrorMessage = Object.keys(control.errors).map(key => (<any>this.errorMessages.heroName)[key]).join(' ');
    }
  }
}
