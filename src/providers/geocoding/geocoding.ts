
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import 'rxjs/add/operator/map';
import { typeSourceSpan } from '../../../node_modules/@angular/compiler';
import { Address } from '../../models/address.interface';
 
declare var google;

@Injectable()
export class GeocodingProvider {

  position;
  lat;
  long;
  results = [];
  google_api_key: any;
  address = {} as Address;
  contentHeader: Headers = new Headers({'Content-Type': 'application/json'});
   
  constructor(public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public http: Http) {
    this.google_api_key = 'AIzaSyCOK7idwvon2zatf089rYJkJXNgO42NuY8';
  }

  /**
   * returns the current position in Latitude and Longitude
   */
  getCurrentPositionLatLong(){

    let options = {
      enableHighAccuracy: true
    };

    return this.geolocation.getCurrentPosition(options);    
  }

  getCurrentPosition(lat, lng){
    var latlng = {lat: 51.032662, lng: 7.117148}
    var geocoder = this.reverseGeocode();  
    geocoder.geocode({'location': latlng}, (results, status) => {
      if(status == "OK"){
        this.results = results;
        for(var i = 0; i < this.results.length -1; i++){
          var types = this.results[i].types;

          if(types.includes("political") && types.includes("sublocality") && types.includes("sublocality_level_1")|| types.includes("sublocality_level_2")){
            console.log(types);
            console.log(results[i]);
            return
          }
          else if(types.includes("political") && types.includes("locality")){
            console.log(types);
            console.log(results[i]);
          }
          else{
            console.log("No gut results " + types )
          }
          
          /*
          if(types.includes("route") || types.includes("street_address")|| types.includes("premise")){
            this.results.splice(i, 1);
            i--;
          }
          else if(types.includes("political") && types.includes("sublocality") && types.includes("sublocality_level_1") || types.includes("sublocality_level_2")){
            console.log("types =  " + types)
            console.log(this.address.cityname)
            return      
          }
          else if(types.includes("political") || types.includes("locality") || types.includes("sublocality") || types.includes("sublocality_level_1")){
            
            console.log("types = all " + types)
          }
          else{
        
            console.log("types =  rest:" + types) 
          }  */    
        }
      }
    });
  }

  getAddress(lat, long) {
    let url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long;
    return this.GET(url);
  }

  reverseGeocode(){
    var geocoder = new google.maps.Geocoder;
    return geocoder;
  }

  /**
   * Not working compleatly correct
   * @param lat 
   * @param long 
   */
  getPlace(){
    var service = new google.maps.places.PlacesService(document.createElement('div'));
    return service;
  }

  getMorePlaceDetails(service, placeId){
    service.getDetails({placeId: placeId}, (place)=>{
      console.log("advanced place" + place)
    })
  }

  getStreetAddress(lat, long) {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + this.google_api_key + '&latlng=' + lat + ',' + long + '&result_type=street_address';
    return this.GET(url);
  }

  GET(url) {
    return this.http.get(url).map(res => res.json());
  }


}
