import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LibraryProvider } from '../../providers/library/library';
import { SelectedbookPage } from '../selectedbook/selectedbook';


/**
 * Generated class for the EntertainmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entertainment',
  templateUrl: 'entertainment.html',
})
export class EntertainmentPage {

  
  entertainment = [];

  constructor(public nav: NavController,private cartService: LibraryProvider) { }

  ngOnInit() {

    console.log(this.entertainment);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntertainmentPage');
  }

  open(book) {
    console.log('show', book);
    this.nav.push(SelectedbookPage, {
      book: book
    });
  }

}
