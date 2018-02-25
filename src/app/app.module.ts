import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {WebcamModule} from 'ngx-webcam';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { GalleryComponent } from './components/gallery/gallery.component';
import {RetrieveImagesService} from "../RetrieveImagesService";
import { PreviewComponent } from './components/preview/preview.component';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [

  {path: '', component: PreviewComponent },
  {path: 'gallery', component: GalleryComponent},
  {path: "**", redirectTo: '/', pathMatch: 'full'}

];

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    RetrieveImagesService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}


