import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { news } from '../Model/news';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordPressConnectionService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf8"
    });
  }

  /**
   * Get all new from the wordpress webpage
   */
  public getNewsFromPage(index): Observable<HttpResponse<news[]>> {
    return this.http.get<news[]>(environment.ACCESS_POINT_POSTS + index, {
      observe: 'response'
    });
  }

  public getNewImage(URL): Observable<HttpResponse<news[]>> {
    return this.http.get<news[]>(URL, {
      observe: 'response'
    });
  }

  public getNewsFromPage2(page): Observable<news[]> {
    return this.http.get<news[]>(environment.ACCESS_POINT_POSTS + page).pipe(
      shareReplay()
    )
  }
}
