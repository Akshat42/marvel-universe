import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../../model/hero";
import {UtilService} from "../../service/util.service";

@Component({
  selector: 'mu-detail-data',
  templateUrl: './detail-data.component.html',
  styleUrls: ['./detail-data.component.scss']
})
export class DetailDataComponent implements OnInit {

  constructor() {
  }
  utilService = new UtilService();
  @Input() detailData: Hero ={description: "", id: 0, imageUrl: "", modified: "", name: "", votes: 0};
  errorMsg = console.error();
  ngOnInit(): void {

  }

}
