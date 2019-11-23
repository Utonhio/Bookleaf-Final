import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { SelectedbookPage } from '../selectedbook/selectedbook';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  constructor(public nav: NavController, public navCtrl: NavController, public navParams: NavParams, public alert: AlertController) {
  }

  favoritesList = [];
  public userId = '';

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
    this.userId = firebase.auth().currentUser.uid;
    this.favoritesList = this.getFavoritesBooks(this.userId);
    console.log(this.favoritesList)
  }

  ionViewWillEnter(){
    this.favoritesList = this.getFavoritesBooks(this.userId);
  }


  getFavoritesBooks(userId) {
    var list = [];
    var query = firebase.database().ref('usuarios/' + userId + '/Favorites').orderByChild('Favorites')
    query.once('value', function (snapshot) {
    snapshot.forEach(function(childSnapshot){
      list.push(childSnapshot.val());
    })

  })
    return list;
  }

  open(book) {
    console.log('show', book);
    this.nav.push(SelectedbookPage, {
      book: book,
      bookname: book.name
    });
  }

  delete(book, userId){

    let seguridad = this.alert.create({
      title: '¿Estás seguro de borrar el libro ' + book.name + "?",
      buttons: [{text:'Cancelar',handler:data=>{console.log('cancel')}},
      {text:'Borrar',handler:data=>{ 
        let alert = this.alert.create({
          title: 'Listo!',
          subTitle: 'El libro se borro de manera exitosa  .',
          buttons: ['Okay']
        });   
        alert.present();
        this.favoritesList = this.getFavoritesBooks(this.userId)
        var query = firebase.database().ref('usuarios/' + userId + "/Favorites/" + book.name);
        query.remove()
        .then(function() {
          
        })
        .catch(function(error) {
          console.log("Remove failed: " + error.message)
        });
      }
    }]
    });
    seguridad.present();
  }

}
