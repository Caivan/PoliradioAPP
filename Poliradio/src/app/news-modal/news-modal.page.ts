import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { ModalController } from "@ionic/angular";

import { DomSanitizer } from '@angular/platform-browser';

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
    console.log(this.post)
    this.content = this.sanitizer.bypassSecurityTrustHtml(this.post.content.rendered);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
