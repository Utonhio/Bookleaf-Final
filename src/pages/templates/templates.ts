import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LibraryProvider } from '../../providers/library/library';
import { SelectedbookPage } from '../selectedbook/selectedbook';

/**
 * Generated class for the TemplatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-templates',
  templateUrl: 'templates.html',
})
export class TemplatesPage {

  templates = [];

  constructor(public nav: NavController, private cartService: LibraryProvider) { }

  ngOnInit() {
    console.log(this.templates);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TemplatesPage');
  }

  open(book) {
    console.log('show', book);
    this.nav.push(SelectedbookPage, {
      book: book
    });
  }

}
