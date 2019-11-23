import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-image-modal',
  templateUrl: 'image-modal.html',
})
export class ImageModalPage {

  img: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageModalPage');
  }

   ngOnInit(){
     this.img = this.navParams.get('img');
   }

   zoom(zoomIn: boolean){

   }

   close(){ 
     this.navCtrl.pop();
   }

}
