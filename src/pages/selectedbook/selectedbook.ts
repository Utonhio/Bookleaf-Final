import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { BookPage } from '../book/book';
import firebase from 'firebase';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-selectedbook',
  templateUrl: 'selectedbook.html',
})
export class SelectedbookPage {
  public userId = '';
  favoritesList;
  bookS = {};
  bookname = '';
  favorites = {}
  bookImg;
  likesList;




  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    this.bookS = this.navParams.get('book');
    this.bookname = this.navParams.get('bookname');
    this.bookImg = this.navParams.get('bookurlcover');

  }

  ionViewDidLoad() {
    this.userId = firebase.auth().currentUser.uid;
    this.favoritesList = this.getFavoritesBooks(this.userId, this.bookname);
    this.likesList = this.getLikes(this.userId, this.bookname);
    console.log(this.likesList)
  }



  show(book) {
    this.navCtrl.push(BookPage, {
      book: book,
      bookname : book.name
    });
  }


  addFavorite(userId, book) {
    firebase.database().ref('usuarios/' + userId + '/Favorites/' + book.name).set({
      author: book.author,
      description: book.description,
      file: book.file,
      genre: book.genre,
      name: book.name,
      stars: book.stars,
      urlCover: book.urlCover
    });
    let alert = this.alert.create({
      title: 'Guardado',
      subTitle: 'Libro guardado en favoritos',
      buttons: ['Accept']
    });
    alert.present();
    this.favoritesList = this.getFavoritesBooks(this.userId, this.bookname);
  }

  deleteFavorites(userId, book){
    let alert = this.alert.create({
      title: 'Listo!',
      subTitle: 'Libro eliminado de favoritos.',
      buttons: ['Okay']
    });   
    alert.present();
    this.favoritesList = this.getFavoritesBooks(this.userId, this.bookname);
    var query = firebase.database().ref('usuarios/' + userId + '/Favorites/' + book.name);
        query.remove()
        .then(function() {
          
        })
        .catch(function(error) {
          console.log("Remove failed: " + error.message)
        });
  }

  getFavoritesBooks(userId, bookname) {
    var list = [];
    var query = firebase.database().ref('usuarios/' + userId + '/Favorites/' + bookname).orderByChild('name');
    query.once('value', function (snapshot) {
        list.push(snapshot.val());
    })

    return list;
  }

  getLikes(userId, bookname){
    var list = [];
    var query = firebase.database().ref('usuarios/' + userId + '/Likes/' + bookname).orderByChild('name');
    query.once('value', function (snapshot) {
        list.push(snapshot.val());
    })

    return list;
  }



  like(userId, book){
    firebase.database().ref('usuarios/' + userId + '/Likes/' + book.name).set({
      name : book.name
    });
    this.likesList = this.getLikes(this.userId, this.bookname);
    var query = firebase.database().ref('books/' + book.name);
    var queryUpdate = firebase.database().ref('books/' + book.name);
    query.once('value', function (snapshot){
      queryUpdate.update({
        stars: snapshot.val().stars + 1
      }) 
    })
    const toast = this.toastCtrl.create({
      message: 'Me gusta!',
      duration: 1000
    });
    toast.present();

  }

  unlike(userId, book){
    var query = firebase.database().ref('usuarios/' + userId + '/Likes/' + book.name);
    query.remove()
    .then(function() {
      var query = firebase.database().ref('books/' + book.name);
      var queryUpdate = firebase.database().ref('books/' + book.name);
      query.once('value', function (snapshot){
        queryUpdate.update({
          stars: snapshot.val().stars - 1
        })
      })
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
    });
    const toast = this.toastCtrl.create({
      message: 'Ya no me gusta :(',
      duration: 1000
    });
    toast.present();
    this.likesList = this.getLikes(this.userId, this.bookname);
    
  }
  
}
