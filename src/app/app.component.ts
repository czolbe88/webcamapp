import { Component } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {WebcamImage} from "ngx-webcam";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private httpClient: HttpClient){

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
    var image2 = webcamImage.imageAsBase64;
    var image = JSON.stringify(webcamImage.imageAsBase64);



    //
    // let formData:FormData = new FormData();
    // formData.append('uploadFile', image);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded; charset=utf-8'
      })
    };



    // var params = {
    //
    //   data: this.webcamImage
    // }

    this.httpClient.post("http://localhost:8888/test", image2, httpOptions ).subscribe();

  }


  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }



}



// postForm(url, body) {
//   var headers = new HttpHeaders();
//   headers.append('Content-Type', 'application/form-data');
//   return this.http.post(url, body, {headers: headers })
// }
