import { Component, OnInit } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import{RetrieveImagesService} from "../../../RetrieveImagesService";
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {



  constructor(private retrieveImageService: RetrieveImagesService, private DomSanitizationService: DomSanitizer) { }

  ngOnInit() {

  }

  galleryImages = this.retrieveImageService.galleryImages;

  photoURL(url: string) {
    return this.DomSanitizationService.bypassSecurityTrustUrl(this.galleryImages[0]);
  }




}
