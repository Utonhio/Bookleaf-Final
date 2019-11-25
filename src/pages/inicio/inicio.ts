import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController,} from 'ionic-angular';
import { HomePage } from '../home/home';
import { HomeentertainmentPage } from '../homeentertainment/homeentertainment';
import firebase from 'firebase';
import { AdminhomePage } from '../adminhome/adminhome';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  public userId = '';
  public role = [];

  constructor(public navParams: NavParams, public nav: NavController, private payPal: PayPal) {
  }

  ngOnInit(){
    this.userId = firebase.auth().currentUser.uid;
    this.role = this.getRole();
  }

  ionViewDidLoad() {
    this.userId = firebase.auth().currentUser.uid;
    this.role = this.getRole();
  }

  Educativo() {
    this.nav.push(HomeentertainmentPage);
  }

  Entretenimiento() {
    this.nav.push(HomePage);
  }

  Administrador(){
    this.nav.push(AdminhomePage);
  }

  upgradePremium(){

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
              this.nav.push(HomePage);  
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

  getRole() {
    var list = [];
    var query = firebase.database().ref('usuarios/' + this.userId).orderByChild('rol');
    query.once('value', function (snapshot) {
      list.push(snapshot.val());
      // ...
    })
    return list;
  }

}
