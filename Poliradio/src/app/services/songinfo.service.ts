import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SonginfoService {
  private headers : HttpHeaders;
  private accessPointURL :string="http://poliradio.airtime.pro/api/live-info";
  constructor(private http:HttpClient) { 
    this.headers = new HttpHeaders({
      "Content-Type":"application/json; charset=utf8"
    });
  }

  /**
   * GET THE SONG JSON WITH THE INFO
   */
  public getSonginfo(): Observable<HttpResponse<string>>{
    return this.http.get<string>(this.accessPointURL,{
      observe:'response'
    });
  }
}
