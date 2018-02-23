import { Component } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {WebcamImage} from "ngx-webcam";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";


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
    console.info("received webcam image", webcamImage);

    this.webcamImage = webcamImage;

    let data = {
      title: "xxxx",
      photo: this.webcamImage
    }

    // var headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/form-data');
    this.httpClient.post("http://localhost:8888/test", data )

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
