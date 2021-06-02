import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class HeroDataService {

  constructor(private http: HttpClient) {
  }

  getAllHeroes(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'comics/1158/characters?' +'apikey=' + environment.apiKey).pipe(map((data: any) => data.data.results));
  }

  getFilteredHeroes(filterString: string): Observable<any> {
    return this.http.get(environment.baseUrl + 'comics/1158/characters?' + 'nameStartsWith=' + filterString + '&apikey=' + environment.apiKey).pipe(map((data: any) => data.data.results));
  }

  getHeroesSortedByName(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'comics/1158/characters?' + 'orderBy=-name' + '&apikey=' + environment.apiKey).pipe(map((data: any) => data.data.results));
  }

  getHeroDetail(heroId: number): Observable<any> {
    return this.http
      .get<any>(environment.baseUrl + "characters/" + heroId + "?apikey=" + environment.apiKey).pipe(map(rawData => rawData.data.results[0]));
  }
}
