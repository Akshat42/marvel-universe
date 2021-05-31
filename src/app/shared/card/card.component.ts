import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mu-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() {
  }

  @Input() hero!: any;
  ngOnInit(): void {

  }
}

