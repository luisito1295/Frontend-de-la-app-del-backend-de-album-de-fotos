import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AlbumListComponent } from './components/album-list/album-list.component';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AlbumAddComponent } from './components/album-add/album-add.component';

import { FormsModule } from '@angular/forms';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { AlbumEditComponent } from './components/album-edit/album-edit.component';
import { ImageAddComponent } from './components/image-add/image-add.component';
import { ImageEditComponent } from './components/image-edit/image-edit.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumListComponent,
    AlbumAddComponent,
    AlbumDetailComponent,
    AlbumEditComponent,
    ImageAddComponent,
    ImageEditComponent,
    ImageDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
