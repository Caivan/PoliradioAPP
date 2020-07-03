import { Component, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SonginfoService } from "../services/songinfo.service";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { songInfo } from '../Model/songInfo';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  @ViewChild('audioPlayer', { static: true }) audioPlayer: HTMLMediaElement;

  public URL = environment.ACCESS_POINT_STREAMING;
  public DEFAULT_IMAGE:String = "../../assets/POLI_RADIO_APP/IMAGEN-POR-DEFECTO.png";

  song$: Observable<songInfo>;
  song: songInfo;
  loaded = false;
  isPlaying = false;  
  progress:number;
  duration:number;
  songName:string;
  songCurrentName;
  artistName: string;
  albumImage:string;
  info:songInfo;
  startSongHour:string[];
  actualHour:string;
  position:number;
  durationValues: string[];
  backgroundImages = {
    on: "url('../../assets/POLI_RADIO_APP/BOTON-ON.png')",
    off: "url('../../assets/POLI_RADIO_APP/BOTON-OFF.png')",

  };
  backgroundImage:string;
  
  constructor(private router: Router, private songinfoService: SonginfoService, private localNotifications : LocalNotifications) {
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
    this.localNotifications.cancelAll(); 
    this.song$ = this.songinfoService.getInfo();
    this.song$.subscribe(resp => {
      setInterval(() => {          
        this.songinfoService.getInfo().subscribe(updt =>{
          resp=updt;
        })                 
        this.song=resp;
        this.songName = this.song.current.metadata.track_title;              
        this.artistName = this.song.current.metadata.artist_name;
        this.albumImage = this.song.current.album_artwork_image;
        this.durationValues = this.song.current.metadata.length.split(":");
        this.startSongHour = this.song.current.starts.split(" ")[1].split(":");
      },
        1000);
      //inicia la cancion                    
    });
  }

  ngOnDestroy(): void {
    this.audioPlayer.pause();
    this.localNotifications.cancelAll();
    console.log("destroy");
  }
    
  control(event:any){
      this.loaded = true;
      this.audioPlayer = event.srcElement;
      this.progress = 0;
  }

  play() {
    if (this.loaded) {
      if (!this.isPlaying) {
        this.audioPlayer.play();
        this.backgroundImage = this.backgroundImages.on;
        this.isPlaying = true;
        this.localNotifications.schedule({
          id: 1,
          title:'PoliRadio reproduciendo',
          text: 'Toque para volver a la aplicación',
          lockscreen: true,
          sticky: true
        });    
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
          this.songCurrentName = this.songName;
        }
      }
    }
  }

  stop() {
    if (this.isPlaying) {
      this.audioPlayer.pause();
     // this.backgroundImage = this.backgroundImages.off;
      this.isPlaying = false;
      this.progress = 0;
      this.localNotifications.cancelAll();
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
    let y = Number(Number(this.startSongHour[0]) * 3600) + Number(this.startSongHour[1]) * 60 + Number(this.startSongHour[2]); //hora inicio cancion en segundos      
    this.duration = Number(this.durationValues[0]) * 3600 + Number(this.durationValues[1]) * 60 + Number(this.durationValues[2]);
    this.position = (x - y) / this.duration; //posicion inicial barra de progreso   
  }

  getBackgroundImage():String{
    return this.backgroundImage = this.backgroundImages.on;
  }
}
