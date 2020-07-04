import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsModalPage } from './news-modal.page';

import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [NewsModalPage, EscapeHtmlPipe]
})
export class NewsModalPageModule {}
