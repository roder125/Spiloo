import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityOverviewPage } from './city-overview';

@NgModule({
  declarations: [
    CityOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CityOverviewPage),
  ],
})
export class CityOverviewPageModule {}
