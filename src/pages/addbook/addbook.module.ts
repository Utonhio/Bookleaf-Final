import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddbookPage } from './addbook';
import { PayPal } from '@ionic-native/paypal';

@NgModule({
  declarations: [
    AddbookPage,
  ],
  imports: [
    IonicPageModule.forChild(AddbookPage),
  ]  
})
export class AddbookPageModule {}
