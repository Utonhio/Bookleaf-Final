import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';
import { RegistroPage } from '../registro/registro';
import * as firebase from "firebase";
import { InicioPage } from '../inicio/inicio';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm;
  loading: any;
  user = {
    email: "",
    password: "",
    rol: "GRATUITO"

  };


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public authData: AuthData, public nav: NavController, public alert: AlertController) {


  }

  login(user) {
    this.presentLoading();
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(data => {
      if (user == null) {
        let alert = this.alert.create({
          title: 'Error',
          subTitle: 'Failed to Sign In ',
          buttons: ['Accept']
        });
        alert.present();

      }

      else {
        this.loading.dismiss();
        this.navCtrl.push(InicioPage);

      }
      //this.notesSservice.createuser(this.user);

    });
  }

  registro(user) {
    //this.navCtrl.push(RegistroPage);
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(data => {
      firebase.database().ref('/usuarios').child(data.user.uid).set({
        rol: user.rol,
        email: user.email,
        password: user.password
      });
      let alert = this.alert.create({
        title: 'Registered',
        subTitle: 'Registered Successfully',
        buttons: ['Accept']
      });


      alert.present();


    });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      content: 'Iniciando sesión...'
    });
    return this.loading.present();
  }

  guardarDato(user) {
    var usuario = {
      rol: user.rol,
      email: user.email,
      password: user.password
    }
    this.registro(usuario);

  }

  rest(email) {
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(res=>{
      console.log('email enviado');
      let alert = this.alertCtrl.create({
        title: 'Te enviamos un correo',
        subTitle:('sigue los pasos para reiniciar tu contraseña'),
        buttons:['Aceptar']
      });
      alert.present();
    }).catch(err=>{
      let alert = this.alertCtrl.create({
        title: 'El correo ingresado no existe en nuestra base de datos',
        buttons:['Aceptar']
      });
      alert.present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}