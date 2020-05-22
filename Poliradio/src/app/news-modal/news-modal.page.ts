import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from "@ionic/angular";
import { news } from "../Model/news";

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.page.html',
  styleUrls: ['./news-modal.page.scss'],
})
export class NewsModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  @Input() public post: news;

  async closeModal() {
    await this.modalController.dismiss();
  }

}
