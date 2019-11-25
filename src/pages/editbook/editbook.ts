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
  bookprecio;
  books = {};
  bookS = {};
  category = ['Gratis', 'Premium', 'Venta'];
  libro = { nombre: '', autor: '', categoria: '', genero: '', descripcion: '', precio:'',archivo: '', portada: '', otroGenero: '' }
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
    this.bookprecio = this.navParams.get('bookprecio')
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
    this.libro.precio = this.bookprecio;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditbookPage');
  }

  editBook() {
    if (this.libro.genero == 'Otro' && this.libro.categoria != 'Venta') {
      let seguridad = this.alert.create({
        title: 'Estan todos los datos bien escritos?',
        buttons: [{ text: 'Cancelar', handler: data => { console.log('cancelOTRO') } },
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
              name: this.libro.nombre,
              stars: this.bookstars,
              urlCover: this.libro.portada
            });
          }
        }]
      });
      seguridad.present();
    }
    if (this.libro.categoria == 'Venta' && this.libro.genero != 'Otro') {
      let seguridad = this.alert.create({
        title: 'Estan todos los datos bien escritos?',
        buttons: [{ text: 'Cancelar', handler: data => { console.log('cancelVENTA') } },
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
              genre: this.libro.genero, 
              stars: this.bookstars,
              precio: this.libro.precio ,
              name: this.libro.nombre,
              urlCover: this.libro.portada
            });
          }
        }]
      });
      seguridad.present();
    }
    if (this.libro.categoria == 'Venta' && this.libro.genero == 'Otro') {
      let seguridad = this.alert.create({
        title: 'Estan todos los datos bien escritos?',
        buttons: [{ text: 'Cancelar', handler: data => { console.log('cancelVENTAOTRO') } },
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
              precio: this.libro.precio ,
              stars: this.bookstars,
              name: this.libro.nombre,
              urlCover: this.libro.portada
            });
          }
        }]
      });
      seguridad.present();
    }
    if (this.libro.categoria != 'Venta' && this.libro.genero != 'Otro') {
      let seguridad = this.alert.create({
        title: 'Estan todos los datos bien escritos?',
        buttons: [{ text: 'Cancelar', handler: data => { console.log('cancelELSE') } },
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