import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { ModalController } from "@ionic/angular";

import { DomSanitizer } from '@angular/platform-browser';
import { stringify } from 'querystring';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.page.html',
  styleUrls: ['./news-modal.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsModalPage implements OnInit {

  @Input() public post: any;
  content;

  constructor(private modalController: ModalController,    private sanitizer: DomSanitizer) { }
  
  ngOnInit() {
    let contenido:String;
    contenido=this.sanitizer.bypassSecurityTrustHtml(this.post.content.rendered)+"";
    //console.log(contenido)
    
    if(contenido.startsWith("SafeValue must use [property]=binding:")){
      contenido=contenido.substring(38,contenido.length)
      }
  //console.log(this.content);
    this.content = contenido;
    
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
