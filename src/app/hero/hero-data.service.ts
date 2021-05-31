import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeroDataService {

  constructor(private http: HttpClient) {}

  getPopularHeroes() : Observable<any> {
    return this.http.get<any>(environment.baseUrl+"comics/18483/characters?apikey="+environment.apiKey).pipe(
      map (
        rawData => rawData.data.results
      )
    )
  }
}
