import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SonginfoService {
  private headers : HttpHeaders;
  constructor(private http:HttpClient) { 
    this.headers = new HttpHeaders({
      "Content-Type":"application/json; charset=utf8"
    });
  }

  /**
   * GET THE SONG JSON WITH THE INFO
   */
  public getSonginfo(): Observable<HttpResponse<string>>{
    return this.http.get<string>(environment.ACCESS_POINT_STREAMING_INFO,{
      observe:'response'
    });
  }
}
