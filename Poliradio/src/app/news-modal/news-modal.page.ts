import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.page.html',
  styleUrls: ['./news-modal.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.post)
  }

  @Input() public post: any;

  async closeModal() {
    await this.modalController.dismiss();
  }

}
