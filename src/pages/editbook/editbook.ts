import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { LibraryProvider } from '../../providers/library/library';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-editbook',
  templateUrl: 'editbook.html',
})
export class EditbookPage {

  bookname;
  bookauthor;
  bookfile;
  bookcategory;
  bookgenre;
  bookurlcover;
  bookdescription;
  bookstars;
  books = {};
  bookS = {};
  category = ['Gratis', 'Premium'];
  libro = { nombre: '', autor: '', categoria: '', genero: '', descripcion: '', archivo: '', portada: '', otroGenero: '' }
  constructor(public navCtrl: NavController, public navParams: NavParams, private cartService: LibraryProvider, public alert: AlertController) {
    this.bookS = this.navParams.get('book');
    this.bookname = this.navParams.get('bookname');
    this.bookauthor = this.navParams.get('bookauthor');
    this.bookfile = this.navParams.get('bookfile');
    this.bookcategory = this.navParams.get('bookcategory');
    this.bookgenre = this.navParams.get('bookgenre');
    this.bookurlcover = this.navParams.get('bookurlcover');
    this.bookdescription = this.navParams.get('bookdescription');
    this.bookstars = this.navParams.get('bookstars');
    console.log(this.bookname)
  }


  ngOnInit() {
    this.books = this.cartService.getAllBooks();
    this.libro.nombre = this.bookname;
    this.libro.autor = this.bookauthor;
    this.libro.categoria = this.bookcategory;
    this.libro.genero = this.bookgenre;
    this.libro.descripcion = this.bookdescription;
    this.libro.archivo = this.bookfile;
    this.libro.portada = this.bookurlcover;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditbookPage');
  }

  editBook() {
    if (this.libro.genero == 'Otro') {
      let seguridad = this.alert.create({
        title: 'Estan todos los datos bien escritos?',
        buttons: [{ text: 'Cancelar', handler: data => { console.log('cancel') } },
        {
          text: 'Si', handler: data => {
            let alert = this.alert.create({
              title: 'Listo!',
              subTitle: 'El libro se guardo de manera correcta.',
              buttons: ['Okay']
            });
            alert.present()
            this.navCtrl.pop();
            firebase.database().ref('books/' + this.libro.nombre).set({
              author: this.libro.autor,
              description: this.libro.descripcion,
              file: this.libro.archivo,
              category: this.libro.categoria,
              genre: this.libro.otroGenero,
              stars: this.bookstars,
              name: this.libro.nombre,
              urlCover: this.libro.portada
            });
          }
        }]
      });
      seguridad.present();
    } else {
      let seguridad = this.alert.create({
        title: 'Estan todos los datos bien escritos?',
        buttons: [{ text: 'Cancelar', handler: data => { console.log('cancel') } },
        {
          text: 'Si', handler: data => {
            let alert = this.alert.create({
              title: 'Listo!',
              subTitle: 'El libro se guardo de manera correcta.',
              buttons: ['Okay']
            });
            alert.present()
            this.navCtrl.pop();
            var query = firebase.database().ref('books/' + this.bookname);
            query.remove()
              .then(function () {
              })
              .catch(function (error) {
                console.log("Remove failed: " + error.message)
              });
            firebase.database().ref('books/' + this.libro.nombre).update({
              author: this.libro.autor,
              category: this.libro.categoria,
              description: this.libro.descripcion,
              file: this.libro.archivo,
              genre: this.libro.genero,
              stars: this.bookstars,
              name: this.libro.nombre,
              urlCover: this.libro.portada
            });
          }
        }]
      });
      seguridad.present();
    }
  }
}

@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterPipeEdit implements PipeTransform {

  transform(value: any, args?: any): any {

    // Remove the duplicate elements
    let uniqueArray = value.filter(function (el, index, array) {
      return array.indexOf(el) == index;
    });

    return uniqueArray;
  }
}