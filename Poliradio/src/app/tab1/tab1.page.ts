import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { WordPressConnectionService } from "../services/word-press-connection.service";
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NewsModalPage } from '../news-modal/news-modal.page';
import { news } from "../Model/news";
import { Observable } from 'rxjs';

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
    this.page++;
  }

  async addNews(){
    this.wpConnection.getNewsFromPage(this.page).subscribe(res => {
      res.forEach(element => {
        this.news$.subscribe(res2 => {
          res2.push(element);
        });
      });
    });
    this.page++;
  }

}
