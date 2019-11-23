import { NgModule, OnInit } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntertainmentPage } from './entertainment';


@NgModule({
  declarations: [
    EntertainmentPage,
  ],
  imports: [
    IonicPageModule.forChild(EntertainmentPage),
  ],
  exports: [
    EntertainmentPage
  ]
})
export class EntertainmentPageModule{

  
}
