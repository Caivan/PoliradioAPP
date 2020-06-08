import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { news } from '../Model/news';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { img } from '../Model/img';

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
  public getNewsFromPage(page): Observable<news[]> {
    return this.http.get<news[]>(environment.ACCESS_POINT_POSTS + page).pipe(
      shareReplay()
    );
  }

  public getNewsImage(id): Observable<img> {
    return this.http.get<img>(environment.ACCESS_POINT_POSTIMAGES + id).pipe(
      shareReplay()
    );
  }
}
