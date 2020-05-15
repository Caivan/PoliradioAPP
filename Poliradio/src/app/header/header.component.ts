import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

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
  

  
  

  constructor(private router:Router,private localNotifications : LocalNotifications){
    
      router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
           this.audioPlayer.pause()
           this.isPlaying = false;
        }
         
      });

  }


  
  ngOnInit():void{
  //console.log("init");
  this.localNotifications.cancelAll();
  }

  ngOnDestroy(): void {
    this.audioPlayer.pause();
    this.localNotifications.cancelAll();
    console.log("destroy");
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
      this.localNotifications.cancelAll();
    }
  }


}
