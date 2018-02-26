import {Component} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {WebcamImage} from "ngx-webcam";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RetrieveImagesService} from "../../../RetrieveImagesService";


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {

  constructor(private httpClient: HttpClient, private retrievalService: RetrieveImagesService) {

  }


  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  // latest snapshot
  public webcamImage: WebcamImage = null;

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log("received webcam image", webcamImage);
    this.webcamImage = webcamImage;
    var image = webcamImage.imageAsDataUrl;



    //
    // let formData:FormData = new FormData();
    // formData.append('uploadFile', image);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',

      })
    };


    this.httpClient.post("http://localhost:8888/upload", btoa(image), httpOptions).subscribe();

  }

  // public getImages(){
  //
  //   this.httpClient.get("localhost:8888/GetAllFiles")
  //
  // }

  public goToGallery(){

    this.retrievalService.retrieveImages();

    console.log("clicked");

  }


  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }


}
