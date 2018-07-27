import { Component, ViewChild, ElementRef, EventEmitter, Output, Input, NgZone  } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { GeocodingProvider } from '../../providers/geocoding/geocoding';
import { Address } from '../../models/address.interface';

declare var google;

@Component({
  selector: 'places-searchbar',
  templateUrl: 'places-searchbar.html'
})
export class PlacesSearchbarComponent {

  text: string;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;
  position;
  lat: any;
  long: any;
  autocomplete: any;
  updatedViewAddress: string;
  address = {} as Address;
  places = [];
  place: any;
  results = [];
  @Output() selectedPlace = new EventEmitter<any>();
  @Output() currentPosition = new EventEmitter<any>();

  constructor(private  mapService: GeocodingProvider, private zone: NgZone) {
  }

  ngOnInit() {
    this.getCurrentPosition()
    this.initAutocomplete();
  }

  viewUpdate(address){
    this.zone.run(() => {
      this.address.cityname = address;
      this.currentPosition.emit(this.address.cityname);
    });
  }
  /**
   * Gets the current position of the user and trys to display it
  */
 getCurrentPosition(){
  this.position = this.mapService.getCurrentPosition()
  .then(position =>{
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude;

    var latlng = {lat: 40.678178, lng: -73.944158};
    var geocoder = this.mapService.reverseGeocode();  
    geocoder.geocode({'location': latlng}, (results, status) => {
      if(status == "OK"){
        console.log(results);
        this.results = results;
        console.log(results[0])
        for(var i = 0; i < this.results.length -1; i++){
          var types = this.results[i].types;

          if(types.includes("route") || types.includes("street_address")|| types.includes("premise")){
            this.results.splice(i, 1);
            i--;
          }
          else if(types.includes("political") && types.includes("sublocality") && types.includes("sublocality_level_1") || types.includes("sublocality_level_2")){
            console.log("types =  " + types)
            console.log(this.address.cityname)
            this.viewUpdate(this.results[i].formatted_address);
            return      
          }
          else if(types.includes("political") || types.includes("locality") || types.includes("sublocality") || types.includes("sublocality_level_1")){
            this.viewUpdate(this.results[i].formatted_address);
            console.log("types = all " + types)
            console.log(this.address.cityname)
          }
          else{
            this.viewUpdate(this.results[i].formatted_address);
            console.log("types =  rest:" + types)
            console.log(this.address.cityname)    
          }      
        }
      }
    });
   /*
      //var latlng = {lat: 45.426451, lng: 13.948507}; 
      var service = this.geoCoderService.getPlace();
      //retruns a place from google places api reduced to the city (locality)
      service.nearbySearch({location: latlng, radius: 1, types: []}, (results) =>{
        if(results.length == 0){
          //alert("Problems with finding your position " + latlng)
          console.log("Problems with finding your position")
        }
        else{
          if(results[0].vicinity == undefined || results[0].photos == undefined){
            service.nearbySearch({location: latlng, radius: 1, types: ["locality"]}, (results) =>{
              console.log(results)
              var place = results[0];        
              this.fillLocationArray(place);   
            });
          }
          else if(results[0].vicinity != undefined && results[0].photos.length != 0){
            console.log("im else")
            var place = results[0];
            this.fillLocationArray(place);   
          }   
        }            
      });*/
    })
    .catch(PositionError =>{
      alert(PositionError.message)
    })  
  }
  /**
   * Initialises the Autocomplete
   */
  initAutocomplete(): void {
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      
    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {

    var options = {
      types: ['(regions)'],
     };

    const autocomplete = new google.maps.places.Autocomplete(addressEl, options);
 
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          console.log("regions: ")
          console.log(place)
          this.selectedPlace.emit(place);
          sub.next(place.geometry.location);
        }
      });
    });
  }

}
