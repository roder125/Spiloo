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
  let: any;
  long: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geoCoder: GeocodingProvider) {
   
  
  }

  ionViewDidLoad() {
    this.getPosition();
  }

  getPosition(){
    this.position = this.geoCoder.getCurrentPosition()
    .then(position =>{
      this.let = position.coords.latitude;
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

}
