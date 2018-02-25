import { Injectable} from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { WebcamImage} from "ngx-webcam";
import { Router} from "@angular/router";

@Injectable()
export class RetrieveImagesService{

  galleryImages= [];


  constructor(private httpClient: HttpClient, private router: Router){


  }

  retrieveImages(){

    this.galleryImages = [];

    this.httpClient.get("http://localhost:8888/GetAllFiles")
      .toPromise()
      .then((resp) => {

          for (let strObj in resp){


            console.log(resp[strObj]);

            var img = JSON.parse(resp[strObj]);
            console.log("as json obj", img); //use this... object with an empty value... need the key only
            var imgKey = Object.keys(img)
            console.log("as key", imgKey);


            var wbci : WebcamImage = new WebcamImage(imgKey[0],'image/jpeg');
            // console.log("wbci.imageasbase64", wbci.imageAsBase64);
            var dataUrl = "data:image/jpeg;base64," + wbci.imageAsBase64;

            console.log("dataurl: ", dataUrl);
            this.galleryImages.push(dataUrl);


            // for(var image in this.galleryImages){
            //   console.log(image);
            //   console.log(this.galleryImages);
            //   console.log(this.galleryImages[image]);
            // }


            // var image = new Image();
            // image.src= resp[strObj];
            // this.galleryImages.push(image.src);

            this.router.navigate(['/gallery'])



          }

        console.log(this.galleryImages)

        //   console.log(this.galleryImages);
        // for (let image in this.galleryImages){
        //   console.log(image);
        //   console.log(this.galleryImages[image]);
        // }



        }
      )
      .catch((error) => {
        console.log(error);
      });



  }










}


