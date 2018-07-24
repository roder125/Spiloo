import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeocodingProvider } from '../../providers/geocoding/geocoding';
import { Observable } from '../../../node_modules/rxjs/Observable';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;
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
    this.initAutocomplete();
    //let elem = <HTMLInputElement>document.getElementsByClassName('searchbar-input')[0];
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
        console.log("cityname: " + address.results[0].address_components[3].long_name);
        console.log("country: " + address.results[0].address_components[7].long_name);
        console.log(address);
        
      },
      err => console.log("Error in getting the street address " + err)
    )
  }

  initAutocomplete(): void {
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {

      let options = {
        center: location,
        zoom: 10
      };
      this.map.setOptions(options);
    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          //this.showAdress(place.geometry.location.lat(), place.geometry.location.lng());
          this.address = place.formatted_address;
          console.log(place);
          this.cityName = place.vicinity;
          console.log(this.cityName);

          console.log(place.photos[0].getUrl({'maxWidth': 1920, 'maxHeight': 1080}));
          /*console.log(place)
          var span : string = place.adr_address;
          var re = /(["])locality">([A-Z])\w+/;
      
          var cityname = span.match(re);
          console.log(cityname)

          console.log("name= "+ cityname);*/

          var geocoder = new google.maps.Geocoder();
          this.geocodeAddress(geocoder, this.map)
          sub.next(place.geometry.location);
        }
      });
    });
  }
}
