import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraServiceProvider {

  constructor(private camera: Camera) {
   
  }

  /**
   * Takes a picture
   */
  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      //saveToPhotoAlbum: true,
      //allowEdit: true
    }
    return this.camera.getPicture(options);
  }

  getPictureFromLibrary(){

  }

}
