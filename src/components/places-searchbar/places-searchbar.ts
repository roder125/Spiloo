import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { GeocodingProvider } from '../../providers/geocoding/geocoding';

declare var google;

@Component({
  selector: 'places-searchbar',
  templateUrl: 'places-searchbar.html'
})
export class PlacesSearchbarComponent {

  text: string;

  constructor(private  mapService: GeocodingProvider) {
    
  }

  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;
  lat;
  long;
  autocomplete: any;
  address: string;

  
  @Output() selectedPlace = new EventEmitter<any>();

  ngOnInit() {
    this.initAutocomplete();
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
