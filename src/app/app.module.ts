import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GeocodingProvider } from '../providers/geocoding/geocoding';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { FIREBASE_CONFIG }  from '../app/firebase.credentials';
import { IonTagsInputModule } from "ionic-tags-input";


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    IonTagsInputModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeocodingProvider,
    FirebaseServiceProvider,
  ]
})
export class AppModule {}
