import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Address } from '../../models/address.interface';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  lat: any;
  long: any;
  cityName: string;
  autocomplete: any;
  address = {} as Address;
  places = [];
  place: any;
  results = [];
  saveArray = [];
  locationPosts = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private fbService: FirebaseServiceProvider,private zone: NgZone) {
   
  }

  ionViewDidLoad() {
    //this.getCurrentPosition();
  }

  viewUpdate(content){
    this.zone.run(() => {
      this.locationPosts = content;
      console.log(content)
    });
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
   * 
   */
  getCurrenPosition(address){
    this.fillAddressObject(address);    
  }

  /**
   * Gets the selected Place from the PlaceSearchComponent
   * @param place 
   */
  getSelectedPlace(address){
    this.fillAddressObject(address);
  }
  /**
   * regEx: ([\w ]*)(, )?([\w ]*), ([a-zA-Z ]*)
   * @param address 
   */
  fillAddressObject(address){
    var results = /([\w ]*)(, )?([\w ]*),([\w ]*)/.exec(address.formatted_address);
    if(results[3] == ""){
      this.address.district = "",
      this.address.cityname = results[1],
      this.address.country = results[4]    
    }
    else{
      this.address.district = results[1],
      this.address.cityname = results[3],
      this.address.country = results[4]
    }
    this.getFilteredPostList(this.address.cityname);
  }

  /**
   * returns a List out of the database
   */
  getFilteredPostList(city){
    this.fbService.getPosts().orderByChild("post/city").equalTo(city).on("child_added",(snapshot) =>{
      var val = snapshot.val();
      
      this.saveArray.push(val)
      this.viewUpdate(this.saveArray.slice().reverse());
    });
  }

  /*
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
  }*/
}
