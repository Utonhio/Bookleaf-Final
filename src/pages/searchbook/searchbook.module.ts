import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchbookPage } from './searchbook';

@NgModule({
  declarations: [
    SearchbookPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchbookPage),
  ],
})
export class SearchbookPageModule {}
