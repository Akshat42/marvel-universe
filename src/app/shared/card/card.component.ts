import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Card} from "../../model/card";

@Component({
  selector: 'mu-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() {
  }

  @Input() card: Card = {imageUrl: '', heroName: '', id: 0};
  @Output() newItemEvent = new EventEmitter<number>();

  ngOnInit(): void {
  }

  getDetailLink(heroId: number) {
    this.newItemEvent.emit(heroId);
  }
}

