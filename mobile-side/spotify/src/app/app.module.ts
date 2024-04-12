import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './navbar/navbar.component';
import { UploadMusicComponent } from './upload-music/upload-music.component';
import { UpdateMusicComponent } from './update-music/update-music.component';
import { DisplayMusicsComponent } from './display-musics/display-musics.component';
import { Media } from '@ionic-native/media/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { File } from '@ionic-native/file/ngx';

@NgModule({
  declarations: [AppComponent, NavbarComponent, UploadMusicComponent,
     UpdateMusicComponent, DisplayMusicsComponent],
  imports: [BrowserModule,
      IonicModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
      ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Media,
  StreamingMedia, FileTransfer, // Déclarer le plugin File Transfer
  File],
  bootstrap: [AppComponent],
})
export class AppModule {}
