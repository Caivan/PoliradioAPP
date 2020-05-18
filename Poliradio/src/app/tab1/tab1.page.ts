import { Component, ComponentFactoryResolver } from '@angular/core';
import { WordPressConnectionService } from "../services/word-press-connection.service";
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  news;
  index = 1;
  maxPage = 1;

  constructor(private wpConnection: WordPressConnectionService) {
    this.getNews();
  }

  async getNews() {
    this.wpConnection.getNewsFromPage(this.index).subscribe(resp => {
      const keys = resp.headers.keys();
      let headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);
      this.news = resp.body;
      this.maxPage = Number(headers[5].substring(headers[5].length - 3, headers[5].length));
    });
  }

  public nextPage() {
    if(this.index < this.maxPage){
      console.log(this.index);
      this.index++;
      this.getNews();
    }
  }

  public previousPage() {
    if (this.index > 1) {
      console.log(this.index);
      this.index = Math.max(1, this.index--);
      this.getNews();
    }
  }

}
