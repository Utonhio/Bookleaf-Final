import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';
import * as firebase from 'Firebase';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public useremail = '';
  public userId = '';
  public role = [];
  loading: any;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, public authData: AuthData, private payPal: PayPal) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.useremail = firebase.auth().currentUser.email;
    this.userId = firebase.auth().currentUser.uid;
    this.role = this.getRole();
    console.log(this.role)
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      content: 'Cerrando sesión...'
    });
    return this.loading.present();
  }

  logOut() {
    this.presentLoading();
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
      this.loading.dismiss();
    });
  }

  getRole() {
    var list = [];
    var query = firebase.database().ref('usuarios/' + this.userId).orderByChild('rol');
    query.once('value', function (snapshot) {
      list.push(snapshot.val());
      // ...
    })
    return list;
  }

  upgradePremium() {

    this.payPal.init({
      PayPalEnvironmentProduction: 'ARHoXgCGZXJ1kMfWcaJFPYZzamlFr8lj_e5YXan38dLxMhvR6iQ5T7zvFETYR6r4yo5Yv5PjN0fMomj7',
      PayPalEnvironmentSandbox: 'sb-qps63524254@personal.example.com'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment('1.00', 'MXN', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          // Successfully paid    
           
              firebase.database().ref('usuarios/' + this.userId + '/rol').set('PREMIUM');
              console.log('Felicidades!')
              this.navCtrl.pop();
          // Example sandbox response
          //4a8ce7b7  DEVICE PAL DEBUG
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });




    // var pago = true;
    // if (pago) {
    //   firebase.database().ref('usuarios/' + this.userId + '/rol').set('PREMIUM');
    //   console.log('Felicidades!')
    //   this.navCtrl.pop();
    // }else{
    //   console.log('Lo sentimos!')
    // }

  }



}
