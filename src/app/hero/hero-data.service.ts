import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class HeroDataService {

  constructor(private http: HttpClient) {
  }

  sortFlag: boolean = true;

  getPopularHeroes(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + "comics/18483/characters?apikey=" + environment.apiKey).pipe(
      map(rawData => rawData.data.results))
  }

  getAllHeroes(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'comics/1158/characters?' + 'apikey=' + environment.apiKey).pipe(map((data: any) => data.data.results));
  }

  getFilteredHeroes(filterString: string): Observable<any> {
    return this.http.get(environment.baseUrl + 'comics/1158/characters?' + 'nameStartsWith=' + filterString + '&apikey=' + environment.apiKey).pipe(map((data: any) => data.data.results));
  }

  getHeroesSortedByName(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'comics/1158/characters?' + 'orderBy=-name' + '&apikey=' + environment.apiKey).pipe(map((data: any) => data.data.results));
  }

  getHeroDetail(heroId: number): Observable<any> {
    return this.http
      .get<any>(environment.baseUrl + "characters/" + heroId + "?apikey=" + environment.apiKey).pipe(
        map(
          rawData => rawData.data.results[0]
        ), catchError(this.handleError)
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

  handleError() {
    alert('The Details of given Hero ID is not Found');
    return "error";
  }
}
