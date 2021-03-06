import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import {songInfo} from '../Model/songInfo';
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
  public getInfo():Observable<songInfo>{
    return this.http.get<songInfo>(environment.ACCESS_POINT_STREAMING_INFO).pipe(
      shareReplay()
    );
  }
}
