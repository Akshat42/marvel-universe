import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ComicDataService {

  constructor(private http: HttpClient) { }

  getAllComics(): Observable<any> {
    return this.http
      .get<any>(environment.baseUrl + "comics?apikey=" + environment.apiKey).pipe(
        map(
          rawComicData => rawComicData.data.results
        )
      )
  }

  getComic(heroId:number): Observable<any> {
    return this.http.get<any>(environment.baseUrl+`comics/${heroId}?apikey=`+environment.apiKey).pipe(
      map(
        comicData => comicData.data.results[0]
      )
    )
  }
}
