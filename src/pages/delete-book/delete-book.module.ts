import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeleteBookPage } from './delete-book';

@NgModule({
  declarations: [
    DeleteBookPage,
  ],
  imports: [
    IonicPageModule.forChild(DeleteBookPage),
  ],
})
export class DeleteBookPageModule {}
