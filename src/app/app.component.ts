import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { InicioPage } from '../pages/inicio/inicio';
import firebase from 'firebase';
import { OneSignal } from '@ionic-native/onesignal';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  //rootHome:any =HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private oneSignal: OneSignal) {
     // Initialize Firebase


     var config = {
      apiKey: "AIzaSyBOEYCPxTdhoTE6nWIv6S2jNRD9IhOol6E",
      authDomain: "bookleaf-cfe18.firebaseapp.com",
      databaseURL: "https://bookleaf-cfe18.firebaseio.com",
      projectId: "bookleaf-cfe18",
      storageBucket: "",
      messagingSenderId: "583571701657",
      appId: "1:583571701657:web:20a18047486599ef"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {

        if (!user) {
            this.rootPage = LoginPage;


        } else {
            this.rootPage = InicioPage;

        }

    });
    // set status bar to white
    //statusBar.backgroundColorByHexString('#ffffff');
    

    /*
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      statusBar.styleDefault();
      splashScreen.hide();
      
      oneSignal.startInit('ec879e58-5bd1-4c55-b029-35f34d811a7c', '583571701657');

      oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      });

      oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });

      oneSignal.endInit();
            
    });
    */
  }
  
}
