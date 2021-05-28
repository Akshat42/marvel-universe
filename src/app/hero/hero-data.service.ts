import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Hero} from "../model/hero";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HeroDataService {

  constructor(private http: HttpClient) {
  }

  getHeroDetail(heroId: number): Observable<Hero> {
    return this.http
      .get<any>(environment.getCharacterUrl+heroId+"?apikey="+environment.apiKey)
      .pipe(
        map(
          rawData => <Hero> {
            id: rawData.data.results[0].id,
            name: rawData.data.results[0].name,
            description: rawData.data.results[0].description,
            modified: rawData.data.results[0].modified,
            thumbnail: {
              extension: rawData.data.results[0].thumbnail.extension,
              path: rawData.data.results[0].thumbnail.path,
            }
          }
        )
      )
  }
}
