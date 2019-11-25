import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LibraryProvider } from '../../providers/library/library';
import { EditbookPage } from '../editbook/editbook';
import firebase from 'firebase';
import { PipesModule } from '../../pipes/pipes.module';

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage {

  books = {};
  bookname = '';
  textoBuscar = '';

  constructor(public nav: NavController, public navParams: NavParams, private cartService: LibraryProvider, public alert: AlertController, public pipe: PipesModule) {
  }

  ngOnInit() {
    this.books = this.cartService.getAllBooksLibrary(); 
  }

  buscar( event ){
    this.textoBuscar = event.value;
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter(){
    this.books = this.cartService.getAllBooksLibrary(); 
    this.textoBuscar = '';
  }

  open(book) {
    console.log('show', book);
    this.nav.push(EditbookPage, {
      book: book,
      bookname: book.name,
      bookauthor: book.author,
      bookfile: book.file,
      bookgenre: book.genre,
      bookurlcover: book.urlCover,
      bookdescription: book.description,
      bookcategory: book.category,
      bookstars : book.stars,
      bookprecio : book.precio
    });
  }

  delete(book){

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
        this.books = this.cartService.getAllBooksLibrary(); 
        var query = firebase.database().ref('books/' + book.name);
        var query2 = firebase.database().ref('usuarios/');
        query2.once('value', function (snapshot) {
          snapshot.forEach(function(childSnapshot){
            var eliminar = firebase.database().ref('usuarios/' + childSnapshot.key + '/Favorites/' + book.name);
            eliminar.remove()
            
            .then(function() {
          
            })
            .catch(function(error) {
              console.log("Remove failed: " + error.message)
            });
          })
        })
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
