import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-city-overview',
  templateUrl: 'city-overview.html',
})
export class CityOverviewPage {

  location:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.location = this.navParams.get("location");
  }

}
