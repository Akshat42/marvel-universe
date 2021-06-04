import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Card} from "../../model/card";
import {UtilService} from "../../service/util.service";

@Component({
  selector: 'mu-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() {
  }

  @Input() card: Card = {imageUrl: '', cardName: '', id: 0};
  @Output() cardClickEmitter = new EventEmitter<number>();

  ngOnInit(): void {
  }

  getDetailLink(id: number) {
    this.cardClickEmitter.emit(id);
  }
}

