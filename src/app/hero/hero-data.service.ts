import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeroDataService {

  constructor(private http: HttpClient) {
  }

  sortFlag: boolean = true;

  getPopularHeroes(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + "comics/18483/characters?apikey=" + environment.apiKey).pipe(
      map(
        rawData => rawData.data.results
      )
    )
  }

  getHeroDetail(heroId: number): Observable<any> {
    return this.http
      .get<any>(environment.baseUrl + "characters/" + heroId + "?apikey=" + environment.apiKey).pipe(
        map(
          rawData => rawData.data.results[0]
        )
      )
  }

  sortByVote(heroes: any): any {
    if (this.sortFlag) {
      heroes.sort((h1: { votes: number; }, h2: { votes: number; }) => {
        return h1.votes > h2.votes ? -1 : 1;
      })
      this.sortFlag = false;
    } else {
      heroes.sort((h1: { votes: number; }, h2: { votes: number; }) => {
        return h1.votes > h2.votes ? 1 : -1;
      })
      this.sortFlag = true;
    }
    return heroes;
  }


}
