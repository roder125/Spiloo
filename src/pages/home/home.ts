import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeocodingProvider } from '../../providers/geocoding/geocoding';
import { TitleCasePipe } from '../../../node_modules/@angular/common';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private geoCoder: GeocodingProvider) {
   
  }

  ionViewDidLoad() {
    this.getPosition();
  }

  getPosition(){
    this.position = this.geoCoder.getCurrentPosition()
    .then(position =>{
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      
    })
    .catch(e =>{
      console.log(e);
    })
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
    console.log(place.formatted_address)
    this.address = place.formatted_address;
    this.cityName = place.vicinity;

    this.place = {
      name : place.vicinity,
      imgUrl : place.photos[0].getUrl({'maxWidth': 1920, 'maxHeight': 1080})
    };

    if(this.places.length >= 1){
      this.places.splice(0, 1, this.place);
    }
    else{
      this.places.push(this.place);
    }
  }

}
