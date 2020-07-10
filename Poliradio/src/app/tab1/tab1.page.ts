import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { WordPressConnectionService } from "../services/word-press-connection.service";
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NewsModalPage } from '../news-modal/news-modal.page';
import { environment } from "src/environments/environment";
import { news } from "../Model/news";
import { Observable } from 'rxjs';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { stringify } from 'querystring';
import { promise } from 'protractor';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll2: IonInfiniteScroll;

  news$ : Observable<news[]>;
  page = 1;
  totalNews = 1;
  imgSource = environment.ACCESS_POINT_POSTIMAGES;

  constructor(private wpConnection: WordPressConnectionService, private modalController: ModalController) { }

  async openModal(post : news) {
    const modal = await this.modalController.create({
      component: NewsModalPage,
      componentProps: {
        post: post
      }
    });

    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log("Modal open");
    });
  }

  ngOnInit() {
    this.getNews();
  }

  doInfinite(event) {
    this.addNews();
    event.target.complete();
  }

  async getNews(){
     
    this.news$ = this.wpConnection.getNewsFromPage(this.page);
    this.news$.subscribe(res => {
      res.forEach(async element => {
        
        await this.wpConnection.getNewsImage(element.featured_media).subscribe(res => {
          element.featured_media = res.source_url;
          element.loaded = true;
        }
        ),error=>{
          element.featured_media= "../../assets/POLI_RADIO_APP/POLIRADIO-BANNER.jpg";
        };
        
        
      })
    });
    this.page++;
  }
  
  async addNews(){
    this.wpConnection.getNewsFromPage(this.page).subscribe(res => {
      res.forEach(async element => {
        
        //element.featured_media= "../../assets/POLI_RADIO_APP/POLIRADIO-BANNER.jpg"; 
         this.wpConnection.getNewsImage(element.featured_media).subscribe(res => {
          element.featured_media = res.source_url;
          element.loaded = true;
        },error=>{
          element.featured_media= "../../assets/POLI_RADIO_APP/POLIRADIO-BANNER.jpg";
        });
        this.news$.subscribe(res2 => {
          res2.push(element);
        });
      });
    });
    this.page++;
  }

}
