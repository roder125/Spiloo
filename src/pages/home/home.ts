import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeocodingProvider } from '../../providers/geocoding/geocoding';

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
  address: string;
  places = [];
  place: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geoCoderService: GeocodingProvider) {
   
  }

  ionViewDidLoad() {
    this.getCurrentPosition();
  }

  getCurrentPosition(){
    this.position = this.geoCoderService.getCurrentPosition()
    .then(position =>{
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      this.geoCoderService.reverseGeocode(this.lat, this.long);
      this.geoCoderService.getPlace(this.lat, this.long);
      
    })
    .catch(e =>{
      console.log(e);
    })
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
    this.navCtrl.push(pageName,{
      location: location
    });
  }

  /**
   * Gets the selected Place from the PlaceSearchComponent
   * @param place 
   */
  getSelectedPlace(place){
    this.address = place.formatted_address;
    this.cityName = place.vicinity;

    this.place = {
      name : place.vicinity,
      imgUrl : place.photos[0].getUrl({'maxWidth': 1920, 'maxHeight': 1080})
    };

    console.log(place)

    if(this.places.length >= 1){
      this.places.splice(0, 1, this.place);
    }
    else{
      this.places.push(this.place);
    }
  }

}
