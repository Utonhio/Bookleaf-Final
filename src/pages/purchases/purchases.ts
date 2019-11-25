import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { SelectedbookPage } from '../selectedbook/selectedbook';

/**
 * Generated class for the PurchasesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchases',
  templateUrl: 'purchases.html',
})
export class PurchasesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  purchasesList = [];
  public userId = '';

  ionViewDidLoad() {
    this.userId = firebase.auth().currentUser.uid;
    this.purchasesList = this.getPurchasesBooks(this.userId);
  }

  getPurchasesBooks(userId) {
    var list = [];
    var query = firebase.database().ref('usuarios/' + userId + '/Comprados').orderByChild('name')
    query.once('value', function (snapshot) {
    snapshot.forEach(function(childSnapshot){
      list.push(childSnapshot.val());
    })

  })
    return list;
  }

  open(book) {
    console.log('show', book);
    this.navCtrl.push(SelectedbookPage, {
      book: book,
      bookname: book.name
    });
  }

}
