import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordPressConnectionService } from "./word-press-connection.service";
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';



/**
 * SERVICES
 */
import {SonginfoService} from './services/songinfo.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    StreamingMedia,
    SonginfoService,
    WordPressConnectionService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
