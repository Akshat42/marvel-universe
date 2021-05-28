import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HeroDataService {

  constructor(private http: HttpClient) {
  }

  getHeroDetail(heroId: number): Observable<any> {
    return this.http
      .get<any>(environment.getCharacterUrl+"characters/"+heroId+"?apikey="+environment.apiKey).pipe(
        map(
          rawData => rawData.data.results[0]
        )
      )
  }
}
