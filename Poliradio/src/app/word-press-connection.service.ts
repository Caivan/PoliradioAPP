import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { news } from "./Model/News";


@Injectable({
  providedIn: 'root'
})
export class WordPressConnectionService {
  private headers: HttpHeaders;
    private accessPointURL: string = "https://poliradio.poligran.edu.co/wp-json/wp/v2/posts/?page=";
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({
            "Content-Type": "application/json; charset=utf8"
        });
    }

    /**
     * Get all new from the wordpress webpage
     */
    public getNewsFromPage(index): Observable<HttpResponse< news[]> >{
      return this.http.get<news[]>(this.accessPointURL + index, {
        observe: 'response'
    });
    }
}
