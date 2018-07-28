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

  position;
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

  /**
   * Shows the Adress based on the Latitude and Longitude
   * @param lat 
   * @param long 
   */
  showAdress(lat, long){
    this.geoCoderService.getAddress(lat, long).subscribe(
      address => {
        console.log("cityname: " + address.results[0].address_components[3].long_name);
        console.log("country: " + address.results[0].address_components[7].long_name);
        console.log(address);
      },
      err => console.log("Error in getting the street address " + err)
    )
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
   */
  getCurrenPosition(address){
    console.log("Home " + address)
    this.address.fullAddress = address;
    var addressSplitArray = this.address.fullAddress.split(",");
    console.log(addressSplitArray);
    if(addressSplitArray.length == 3){
      this.address.district = addressSplitArray[0];
      this.address.cityname = addressSplitArray[1];
      this.address.country = addressSplitArray[2];
    }
    else{
      this.address.district = ""
      this.address.cityname = addressSplitArray[0];
      this.address.country = addressSplitArray[1];
    }  
    
    console.log("district " + this.address.district)
    console.log("name " +this.address.cityname)
    console.log("country " +this.address.country)
  }

  /**
   * Gets the selected Place from the PlaceSearchComponent
   * @param place 
   */
  getSelectedPlace(place){
    this.address = place.formatted_address;
    this.cityName = place.vicinity;
    this.fillLocationArray(place);
  }

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
  }
}
