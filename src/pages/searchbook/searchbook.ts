import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { SelectedbookPage } from '../selectedbook/selectedbook';
import { PipesModule} from '../../pipes/pipes.module'
import { LibraryProvider } from '../../providers/library/library';


@IonicPage()
@Component({
  selector: 'page-searchbook',
  templateUrl: 'searchbook.html',
})
export class SearchbookPage {

  constructor(public nav: NavController, public navParams: NavParams, public pipe: PipesModule, private cartService: LibraryProvider) {
    this.searchFree = this.navParams.get('searchFree');
    this.searchPremium = this.navParams.get('searchPremium');
  }
  public userId = '';
  public role = [];
  searchListPremium: any[] = [];
  searchListFree: any[] = [];
  textoBuscar = '';
  searchFree = '';
  searchPremium = '';

  ngOnInit() {
    this.searchListPremium = this.cartService.getBooksPremium();
    this.searchListFree = this.cartService.getBooksFree();
  }

  buscar( event ){
    this.textoBuscar = event.value;
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchbookPage');
    this.userId = firebase.auth().currentUser.uid;
    this.role = this.getRole();
  }

  getRole() {
    var list = [];
    var query = firebase.database().ref('usuarios/' + this.userId).orderByChild('rol');
    query.once('value', function (snapshot) {
      list.push(snapshot.val());
      // ...
    })
    return list;
  }

  open(book) {
    console.log('show', book);
    this.nav.push(SelectedbookPage, {
      book: book,
      bookname : book.name
    });
  }
}
