import {Component, HostListener, OnInit} from '@angular/core';
import {HeroDataService} from "../../hero/hero-data.service";
import {Card} from "../../model/card";
import {ComicDataService} from "../comic-data.service";
import {UtilService} from "../../service/util.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Comic} from "../../model/comic";

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

  modalComicFormGroup = this.fb.group({
    comicId: '',
    comicName: ''
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
  }

  onComicModalClick() {
    this.showComicModal = true;
  }

  hideModal() {
    this.showComicModal = false;
  }

  @HostListener('document:click', ['$event'])
  clickOnWindow(event: any) {
    if (event.target.className == "card-container" || event.target.className === "card") {
      this.showComicModal = false;
    }
  }

  addComicDetail() {
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
