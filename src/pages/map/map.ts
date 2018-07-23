import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeocodingProvider } from '../../providers/geocoding/geocoding';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat;
  long;
  cityName: string;
  autocomplete: any;
  address: string;
  findLocation: boolean =  false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private  mapService: GeocodingProvider) {
    
  }

  ionViewDidLoad() {
    this.initMap();
    let elem = <HTMLInputElement>document.getElementsByClassName('searchbar-input')[0];
    //this.autocomplete = new google.maps.places.Autocomplete(elem);
    
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 8,
      center: {lat: 50.9990598, lng: 7.1245164999999995}
    });
    var geocoder = new google.maps.Geocoder();

    if(this.findLocation == true){
      this.geocodeAddress(geocoder, this.map);
    }
  }

  geocodeAddress(geocoder, resultsMap){
    var address = this.address;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  showPos(){
    if(this.address == ""){
      
    }
    else{
      this.findLocation = true;
      this.initMap();
    }  
  }

  /**
   * gets the current Position
   */
  getCurrentPosition(){
    this.mapService.getCurrentPosition()
    .then(position =>{
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
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
    this.mapService.getAddress(lat, long).subscribe(
      address => {
        console.log(address.results[0].formatted_address);
        console.log(address.results[0].address_components[3].long_name);
        console.log(address);
        
      },
      err => console.log("Error in getting the street address " + err)
    )
  }

  /**
   * Just a test button
   */
  showPosName(){
    this.showAdress(this.lat, this.long);
  }

  getAddress(place: Object) {
    console.log("place")     
    console.log(place)  
    this.address = place['formatted_address'];
    var location = place['geometry']['location'];
    var lat =  location.lat();
    var lng = location.lng();
    console.log('Address Object', place);
}
}
