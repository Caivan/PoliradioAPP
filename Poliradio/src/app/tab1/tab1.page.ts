import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { WordPressConnectionService } from "../services/word-press-connection.service";
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NewsModalPage } from '../news-modal/news-modal.page';
import { news } from "../Model/news";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll2: IonInfiniteScroll;

  scrollArray: news[];
  index = 1;
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
      console.log("Se mando");
    });
  }

  ngOnInit() {
    this.getNews(true, "");
  }

  async getNews(isFirst, event) {
    if (isFirst) {
      this.wpConnection.getNewsFromPage(this.index).subscribe(resp => {
        const keys = resp.headers.keys();
        let headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
        this.scrollArray = resp.body;
        this.totalNews = Number(headers[5].substring(headers[5].length - 3, headers[5].length));
      }, (err) => {
        console.log(err);
      });
    } else {
      this.wpConnection.getNewsFromPage(this.index).subscribe(resp => {
        const keys = resp.headers.keys();
        let headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
        let arr: news[];
        arr = resp.body;
        arr.forEach(element => {
          this.scrollArray.push(element);
        });
      }, (err) => {
        console.log(err);
      });
    }
    this.index++;
    event.target.complete();
  }

  doInfinite(event) {
    this.getNews(false, event);
  }

}
