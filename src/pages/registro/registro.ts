import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';
import * as firebase from "firebase";


@IonicPage()
@Component({
    selector: 'page-registro',
    templateUrl: 'registro.html',
})
export class RegistroPage {
    public signupForm;
    loading: any;
    role: "0";


    constructor(public nav: NavController, public authData: AuthData,
        public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {

        this.signupForm = formBuilder.group({
            email: [''],
            password: [''],
            role: 'GRATIS'
        })
    }

    signupUser() {
        firebase.auth().createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(data => {
            firebase.database().ref('/usuarios').child(data.user.uid).set({
              rol: this.signupForm.role,
              email: this.signupForm.email,
            });
            let alert = this.alertCtrl.create({
              title: 'Registered',
              subTitle: 'Registered Successfully',
              buttons: ['Accept']
            }); 
            alert.present();
          });
    }

    Regresar(){
        this.nav.pop();
    }

}
