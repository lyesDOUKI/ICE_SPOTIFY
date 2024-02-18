import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadMusicComponent } from './upload-music/upload-music.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateMusicComponent } from './update-music/update-music.component';
import { MusicByStyleComponent } from './music-by-style/music-by-style.component';
import { DisplayMusicsComponent } from './display-musics/display-musics.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadMusicComponent,
    UpdateMusicComponent,
    MusicByStyleComponent,
    DisplayMusicsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
