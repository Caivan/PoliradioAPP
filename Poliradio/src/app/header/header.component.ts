import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{
 
  @ViewChild('audioPlayer',{static: true})audioPlayer: HTMLMediaElement;

  public URL= "https://poliradio.out.airtime.pro/poliradio_b";
  loaded = false;
  isPlaying = false;
  progress = 0;

  constructor(private router:Router){
      router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
           this.audioPlayer.pause()
           this.isPlaying = false;
        }
         
      });

  }


  ngOnDestroy(): void {
    this.audioPlayer.pause();
  }

  control(event:any){
      this.loaded = true;
      console.log(event)
      this.audioPlayer = event.srcElement;
      this.progress = 0;
  }

  play(){
    if(this.loaded){
      if(!this.isPlaying){
        this.audioPlayer.play();
        this.isPlaying = true;
      }
    }
  }

  update(){
    if(this.loaded){
      if(this.isPlaying){
        this.progress = this.audioPlayer.duration;
      }
    }
  }

  stop(){
    if(this.isPlaying){
      this.audioPlayer.pause();
      this.isPlaying = false;
      this.progress = 0;
    }
  }


}
