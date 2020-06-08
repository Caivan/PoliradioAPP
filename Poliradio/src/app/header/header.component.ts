import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SonginfoService } from "../services/songinfo.service";
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
import { format } from 'url';
import { formatNumber, formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { songInfo } from '../Model/songInfo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @ViewChild('audioPlayer', { static: true }) audioPlayer: HTMLMediaElement;

  public URL = environment.ACCESS_POINT_STREAMING;
  song$: Observable<songInfo>;
  loaded = false;
  isPlaying = false;
  progress;
  duration;
  songName;
  songCurrentName;
  artistName: String;
  albumImage;
  info:songInfo;
  startSongHour;
  actualHour;
  position;
  durationValues: string[];

  constructor(private router: Router, private songinfoService: SonginfoService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.audioPlayer.pause()
        this.isPlaying = false;
      }
    });
    this.getCurrent();
    this.songCurrentName = this.songName;
  }
  ngOnInit(): void {    
    this.song$ = this.songinfoService.getInfo();
    this.song$.subscribe(resp => {
      setInterval(() => {          
        this.songinfoService.getInfo().subscribe(updt =>{
          resp=updt;
        })                 
        this.songName = resp.current.metadata.track_title;              
        this.artistName = resp.current.metadata.artist_name;
        this.albumImage = resp.current.album_artwork_image;
        this.durationValues = resp.current.metadata.length.split(":");
        this.startSongHour = resp.current.starts.split(" ")[1].split(":");
      },
        1000);
      //inicia la cancion                    
    });
  }

  ngOnDestroy(): void {
    this.audioPlayer.pause();
  }

  control(event: any) {
    this.loaded = true;
    this.audioPlayer = event.srcElement;
  }

  play() {
    if (this.loaded) {
      if (!this.isPlaying) {
        this.audioPlayer.play();
        this.isPlaying = true;
      }
    }
  }
  update() {
    if (this.loaded) {
      if (this.isPlaying) {
        this.progress = this.position;
        this.getProgress();
        if (this.songName != this.songCurrentName) {
          this.progress = 0;
          this.audioPlayer.currentTime = 0;
          this.songCurrentName = this.songName;
        }
      }
    }
  }

  stop() {
    if (this.isPlaying) {
      this.audioPlayer.pause();
      this.isPlaying = false;
      this.progress = 0;
    }
  }
  /**
   * GET THE INFO OF THE CURRENT SONG
   */
  getCurrent() {
    //ssss  
  }
  getProgress() {
    let actualHour = new Date();
    actualHour.setHours(actualHour.getHours() + 5);
    let x = Number(actualHour.getHours()) * 3600 + Number(actualHour.getMinutes()) * 60 + Number(actualHour.getSeconds()); //hora actual en segundos 
    let y = Number((this.startSongHour[0]) * 3600) + Number(this.startSongHour[1]) * 60 + Number(this.startSongHour[2]); //hora inicio cancion en segundos      
    this.duration = Number(this.durationValues[0]) * 3600 + Number(this.durationValues[1]) * 60 + Number(this.durationValues[2]);
    this.position = (x - y) / this.duration; //posicion inicial barra de progreso   
  }
}
