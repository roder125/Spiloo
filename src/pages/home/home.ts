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

  /**
   * Gets the current position of the user and trys to display it
   */
  getCurrentPosition(){
    this.position = this.geoCoderService.getCurrentPosition()
    .then(position =>{
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      var latlng = {lat: this.lat, lng: this.long};
      //this.geoCoderService.reverseGeocode(this.lat, this.long);
      //var latlng = {lat: 50.737430, lng: 7.098207};
      var service = this.geoCoderService.getPlace();
      //retruns a place from google places api reduced to the city (locality)
      service.nearbySearch({location: latlng, radius: 1, types: ["locality", "country"]}, (results) =>{
        if(results.length == 0){

          console.log("Problems with finding your position")
        }
        else{
          var place = results[0];
          this.fillLocationArray(place);   
        }            
      });
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
    this.fillLocationArray(place);

  }

  fillLocationArray(place){
    if(place.vicinity == undefined){
      this.place = {
        name : place.name,
        imgUrl : place.photos[0].getUrl({'maxWidth': 1920, 'maxHeight': 1080})
      };
    }
    else{
      this.place = {
        name : place.vicinity,
        imgUrl : place.photos[0].getUrl({'maxWidth': 1920, 'maxHeight': 1080})
      };
    }

    if(this.places.length >= 1){
      this.places.splice(0, 1, this.place);
    }
    else{
      this.places.push(this.place);
    }
  }

}
