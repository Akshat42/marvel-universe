import {Component, Input, OnInit} from '@angular/core';
import {Comic} from "../../model/comic";

@Component({
  selector: 'mu-comic-data',
  templateUrl: './comic-data.component.html',
  styleUrls: ['./comic-data.component.scss']
})
export class ComicDataComponent implements OnInit {

  constructor() {
  }

  @Input() comicData: Comic = {description: "", id: 0, imageUrl: "", modified: "", name: ""};
  @Input() error = '';
  ngOnInit(): void {
  }

}
