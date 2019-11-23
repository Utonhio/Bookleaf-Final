import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LibraryProvider } from '../../providers/library/library';
import { SelectedbookPage } from '../selectedbook/selectedbook';

/**
 * Generated class for the EducationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-education',
  templateUrl: 'education.html',
})
export class EducationPage {

  education = [];

  constructor(public nav: NavController, private cartService: LibraryProvider) { }

  ngOnInit() {
    console.log(this.education);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EducationPage');
  }

  open(book) {
    console.log('show', book);
    this.nav.push(SelectedbookPage, {
      book: book
    });
  }

}
