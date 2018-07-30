import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeocodingProvider } from '../../providers/geocoding/geocoding';
import { Address } from '../../models/address.interface';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  lat: any;
  long: any;
  cityName: string;
  autocomplete: any;
  address = {} as Address;
  places = [];
  place: any;
  results = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private geoCoderService: GeocodingProvider) {
   
  }

  ionViewDidLoad() {
    //this.getCurrentPosition();
  }

  openPage(pageName: string, location: string){
    if(pageName == "AddPostPage"){
      this.navCtrl.push(pageName,{
        address: this.address
      });
    }
    else{
      this.navCtrl.push(pageName,{
        location: location
      });
    } 
  }

  /**
   * Get the current Position from the Component
   * 
   */
  getCurrenPosition(address){
    this.fillAddressObject(address);    
  }

  /**
   * Gets the selected Place from the PlaceSearchComponent
   * @param place 
   */
  getSelectedPlace(address){
    this.fillAddressObject(address);
  }
  /**
   * regEx: ([\w ]*)(, )?([\w ]*), ([a-zA-Z ]*)
   * @param address 
   */
  fillAddressObject(address){
    var results = /([\w ]*)(, )?([\w ]*),([\w ]*)/.exec(address.formatted_address);
    if(results[3] == ""){
      this.address.district = "",
      this.address.cityname = results[1],
      this.address.country = results[4]    
    }
    else{
      this.address.district = results[1],
      this.address.cityname = results[3],
      this.address.country = results[4]
    }
  }

  /*
  fillLocationArray(place){
    var photo: number = 0;
    if(place.vicinity == undefined){
      if(place.photos == undefined){
        this.place = {
          name : place.name,
        };
      }
      else{
        this.place = {
          name : place.name,
          imgUrl : place.photos[photo].getUrl({'maxWidth': 1920, 'maxHeight': 1080})
        };
      }    
    }
    else{
      if(place.photos == undefined){
        this.place = {
          name : place.name,
        };
      }
      else{
        this.place = {
          name : place.vicinity,
          imgUrl : place.photos[photo].getUrl({'maxWidth': 1920, 'maxHeight': 1080})
        };
      }
    }
    
    if(this.places.length >= 1){
      this.places.splice(0, 1, this.place);
    }
    else{
      this.places.push(this.place);
    }
  }*/
}
