
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import 'rxjs/add/operator/map';
 
declare var google;

@Injectable()
export class GeocodingProvider {

  google_api_key: any;
  contentHeader: Headers = new Headers({'Content-Type': 'application/json'});
   
  constructor(public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public http: Http) {
    this.google_api_key = 'AIzaSyCOK7idwvon2zatf089rYJkJXNgO42NuY8';
  }

  /**
   * returns the current position in Latitude and Longitude
   */
  getCurrentPosition(){

    let options = {
      enableHighAccuracy: true
    };

    return this.geolocation.getCurrentPosition(options);    
  }

  getAddress(lat, long) {
    let url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long;
    return this.GET(url);
  }

  reverseGeocode(lat, long){
    var geocoder = new google.maps.Geocoder;
    var latlng = {lat: lat, lng: long};
    geocoder.geocode({'location': latlng}, function(results, status) {
      //console.log(results)
    });
  }

  /**
   * Not working compleatly correct
   * @param lat 
   * @param long 
   */
  getPlace(lat, long){
    var latlng = {lat: lat, lng: long};
    var service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch({location: latlng, radius: 1, types: ['(cities)']}, (results) =>{
      console.log(results[0])
    });
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
