import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const PUBLIC_KEY = '6c0a2dbaed45c876341b54f46cdafe72';

@Injectable({
  providedIn: 'root'
})
export class HeroDataService {
  URL_API = `https://gateway.marvel.com:443/v1/public/comics/1158/characters?`;
  constructor(private http: HttpClient) {
  }

  getAllHeroes(): Observable<any> {
    return this.http.get<any>(this.URL_API + 'apikey='+PUBLIC_KEY).pipe(map((data: any) => data.data.results));
  }

  getFilteredHeroes(filterString: string): Observable<any> {
    return this.http.get(this.URL_API+'nameStartsWith='+filterString+'&apikey='+PUBLIC_KEY).pipe(map((data: any) => data.data.results));
  }

  getHeroesSortedByName(): Observable<any> {
    return this.http.get<any>(this.URL_API+'orderBy=-name'+'&apikey='+PUBLIC_KEY).pipe(map((data: any) => data.data.results));
  }

  getFilteredHeroesSortedByName(filterString: string): Observable<any> {
    return this.http.get<any>(this.URL_API+'nameStartsWith='+filterString+'&orderBy=-name'+'&apikey='+PUBLIC_KEY).pipe(map((data: any) => data.data.results));
  }
}
