import {Component, HostListener, OnInit} from '@angular/core';
import {Card} from "../../model/card";
import {ComicDataService} from "../comic-data.service";
import {UtilService} from "../../service/util.service";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'mu-comic-list-container',
  templateUrl: './comic-list-container.component.html',
  styleUrls: ['./comic-list-container.component.scss']
})
export class ComicListContainerComponent implements OnInit {

  constructor(private comicDataService: ComicDataService,
              private utilService: UtilService,
              private fb: FormBuilder
  ) {
  }

  comics: Card[] = [];
  showComicModal: boolean = false;
  displayComicNameMessage! :string;
  displayComicDescMessage!: string;
  private validationMessages = {
    'comicName': {
      'required':"Comic Name is required!"
    },
    'comicDesc': {
      'required': "Comic Description is required!"
    }
  }

  modalComicFormGroup = this.fb.group({
    comicId: [{value: Math.ceil(Math.random() * 1000), disabled: true}, Validators.required],
    comicName: ['', Validators.required],
    comicDesc:['',Validators.required]
  })

  ngOnInit(): void {
    this.comicDataService.getAllComics().subscribe(
      (comics) => {
        comics.forEach((comic: any) => {
          this.comics.push({
            imageUrl: comic.thumbnail.path + "." + comic.thumbnail.extension,
            cardName: comic.title,
            id: comic.id
          })
        })
        this.utilService.hideLoader();
      }
    )
    const comicNameControl = this.modalComicFormGroup.get('comicName');
    comicNameControl?.valueChanges.subscribe(
      value => this.setComicNameMessage(comicNameControl)
    );

    const comicDescControl = this.modalComicFormGroup.get('comicDesc');
    comicDescControl?.valueChanges.subscribe(
      value => this.setComicDescMessage(comicDescControl)
    );
  }

  onComicModalClick() {
    this.showComicModal = true;
  }

  hideModal() {
    this.showComicModal = false;
  }

  setComicNameMessage(control: AbstractControl): void {
    this.displayComicNameMessage = '';
    if ((control.touched || control.dirty) && control.errors) {
      this.displayComicNameMessage = Object.keys(control.errors).map(key => (<any>this.validationMessages.comicName)[key]).join(' ');
    }
  }

  setComicDescMessage(control: AbstractControl): void {
    this.displayComicDescMessage = '';
    if ((control.touched || control.dirty) && control.errors) {
      this.displayComicDescMessage = Object.keys(control.errors).map(key => (<any>this.validationMessages.comicDesc)[key]).join(' ');
    }
  }

  @HostListener('document:click', ['$event'])
  clickOnWindow(event: any) {
    if (event.target.className == "card-container") {
      this.showComicModal = false;
    }
  }

  addComicDetail() {
    if(this.modalComicFormGroup.valid) {
      let comicId = this.modalComicFormGroup.get('comicId')?.value;
      let comicName = this.modalComicFormGroup.get('comicName')?.value;
      let newComic: Card = {
        id: comicId,
        imageUrl: "http://i.annihil.us/u/prod/marvel/i/mg/f/c0/4bc66d78f1bee.jpg",
        cardName: comicName
      }
      this.comics.unshift(newComic);
      this.hideModal();
    }
  }

}
