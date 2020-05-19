import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';

/**
 * Angular material
 */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


/**
 * SERVICES
 */
import {SonginfoService} from './services/songinfo.service';
import { WordPressConnectionService } from './services/word-press-connection.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule],
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
