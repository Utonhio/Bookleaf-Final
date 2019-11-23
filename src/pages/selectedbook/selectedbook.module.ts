import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectedbookPage } from './selectedbook';

@NgModule({
  declarations: [
    SelectedbookPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectedbookPage),
  ],
  exports: [
    SelectedbookPage
  ]
})
export class SelectedbookPageModule {}
