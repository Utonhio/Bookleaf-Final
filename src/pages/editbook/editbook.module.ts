import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditbookPage } from './editbook';

@NgModule({
  declarations: [
    EditbookPage,
  ],
  imports: [
    IonicPageModule.forChild(EditbookPage),
  ],
})
export class EditbookPageModule {}
