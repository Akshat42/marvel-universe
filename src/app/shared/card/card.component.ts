import {Component, Input, OnInit} from '@angular/core';
import {HeroDataService} from "../../hero/hero-data.service";

@Component({
  selector: 'mu-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(private heroDataService: HeroDataService) {
  }

  @Input() hero: any;

  ngOnInit(): void {
  }

}

