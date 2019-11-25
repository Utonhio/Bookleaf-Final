import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { LibraryProvider } from '../../providers/library/library';

@IonicPage()
@Component({
  selector: 'page-addbook',
  templateUrl: 'addbook.html',
})
export class AddbookPage {


  genreList;
  books = {};
  genres = [];
  category = ['Gratis', 'Premium', 'Venta'];

  libro = { nombre: '', autor: '', stars: 0, categoria: '', genero: '', otroGenero: '', precio:'', descripcion: '', archivo: '', portada: '' }
  constructor(public navCtrl: NavController, public navParams: NavParams, private cartService: LibraryProvider, public alert: AlertController) {
  }

  ngOnInit() {
    this.books = this.cartService.getAllBooks();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddbookPage');
  }

  addBook() {
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
              stars: this.libro.stars,
              name: this.libro.nombre,
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
              precio: this.libro.precio ,
              stars: this.libro.stars,
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
              stars: this.libro.stars,
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
              stars: this.libro.stars,
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
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    // Remove the duplicate elements
    let uniqueArray = value.filter(function (el, index, array) {
      return array.indexOf(el) == index;
    });

    return uniqueArray;
  }
}
