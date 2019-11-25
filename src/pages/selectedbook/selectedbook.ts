import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { BookPage } from '../book/book';
import firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

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
  purchasesList;
  public role = [];


  constructor(public navCtrl: NavController, private payPal: PayPal, public navParams: NavParams, public alert: AlertController, public toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    this.bookS = this.navParams.get('book');
    this.bookname = this.navParams.get('bookname');
    this.bookImg = this.navParams.get('bookurlcover');

  }

  ngOnInit() {
    this.role = this.getRole();
    console.log(this.role)
  }

  ionViewDidLoad() {
    this.userId = firebase.auth().currentUser.uid;
    this.favoritesList = this.getFavoritesBooks(this.userId, this.bookname);
    this.likesList = this.getLikes(this.userId, this.bookname);
    this.role = this.getRole();
    this.purchasesList = this.getPurchasesBooks(this.userId, this.bookname)
    console.log(this.likesList)
    console.log(this.purchasesList);
  }



  show(book) {
    this.navCtrl.push(BookPage, {
      book: book,
      bookname: book.name
    });
  }


  addFavorite(userId, book) {
    firebase.database().ref('usuarios/' + userId + '/Favorites/' + book.name).set({
      author: book.author,
      category: book.category,
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

  deleteFavorites(userId, book) {
    let alert = this.alert.create({
      title: 'Listo!',
      subTitle: 'Libro eliminado de favoritos.',
      buttons: ['Okay']
    });
    alert.present();
    this.favoritesList = this.getFavoritesBooks(this.userId, this.bookname);
    var query = firebase.database().ref('usuarios/' + userId + '/Favorites/' + book.name);
    query.remove()
      .then(function () {

      })
      .catch(function (error) {
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

  getPurchasesBooks(userId, bookname) {
    var list = [];
    var query = firebase.database().ref('usuarios/' + userId + '/Comprados/' + bookname + '/name');
    query.once('value', function (snapshot) {
      list.push(snapshot.val());
    })

    return list;
  }

  getLikes(userId, bookname) {
    var list = [];
    var query = firebase.database().ref('usuarios/' + userId + '/Likes/' + bookname).orderByChild('name');
    query.once('value', function (snapshot) {
      list.push(snapshot.val());
    })

    return list;
  }



  like(userId, book) {
    firebase.database().ref('usuarios/' + userId + '/Likes/' + book.name).set({
      name: book.name
    });
    this.likesList = this.getLikes(this.userId, this.bookname);
    var query = firebase.database().ref('books/' + book.name);
    var queryUpdate = firebase.database().ref('books/' + book.name);
    query.once('value', function (snapshot) {
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

  unlike(userId, book) {
    var query = firebase.database().ref('usuarios/' + userId + '/Likes/' + book.name);
    query.remove()
      .then(function () {
        var query = firebase.database().ref('books/' + book.name);
        var queryUpdate = firebase.database().ref('books/' + book.name);
        query.once('value', function (snapshot) {
          queryUpdate.update({
            stars: snapshot.val().stars - 1
          })
        })
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message)
      });
    const toast = this.toastCtrl.create({
      message: 'Ya no me gusta :(',
      duration: 1000
    });
    toast.present();
    this.likesList = this.getLikes(this.userId, this.bookname);

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

  buyBook(userId, book) {

    this.payPal.init({
      PayPalEnvironmentProduction: 'ARHoXgCGZXJ1kMfWcaJFPYZzamlFr8lj_e5YXan38dLxMhvR6iQ5T7zvFETYR6r4yo5Yv5PjN0fMomj7',
      PayPalEnvironmentSandbox: 'sb-qps63524254@personal.example.com'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(book.precio, 'MXN', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          // Successfully paid    

          firebase.database().ref('usuarios/' + userId + '/Comprados/' + book.name).set({
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
            subTitle: 'Libro comprado',
            buttons: ['Accept']
          });
          alert.present();
          this.purchasesList = this.getPurchasesBooks(this.userId, this.bookname)
          // Example sandbox response
          //4a8ce7b7  DEVICE PAL DEBUG
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });




    // var pago = true;
    // if (pago) {
    //   firebase.database().ref('usuarios/' + this.userId + '/rol').set('PREMIUM');
    //   console.log('Felicidades!')
    //   this.navCtrl.pop();
    // }else{
    //   console.log('Lo sentimos!')
    // }

  }

  upgradePremium() {

    this.favoritesList = this.getFavoritesBooks(this.userId, this.bookname);
    this.likesList = this.getLikes(this.userId, this.bookname);
    this.role = this.getRole();
    this.purchasesList = this.getPurchasesBooks(this.userId, this.bookname)

    this.payPal.init({
      PayPalEnvironmentProduction: 'ARHoXgCGZXJ1kMfWcaJFPYZzamlFr8lj_e5YXan38dLxMhvR6iQ5T7zvFETYR6r4yo5Yv5PjN0fMomj7',
      PayPalEnvironmentSandbox: 'sb-qps63524254@personal.example.com'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment('1.00', 'MXN', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          // Successfully paid    

          firebase.database().ref('usuarios/' + this.userId + '/rol').set('PREMIUM');
          this.favoritesList = this.getFavoritesBooks(this.userId, this.bookname);
          this.likesList = this.getLikes(this.userId, this.bookname);
          this.role = this.getRole();
          this.purchasesList = this.getPurchasesBooks(this.userId, this.bookname)
          // Example sandbox response
          //4a8ce7b7  DEVICE PAL DEBUG
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });




    // var pago = true;
    // if (pago) {
    //   firebase.database().ref('usuarios/' + this.userId + '/rol').set('PREMIUM');
    //   console.log('Felicidades!')
    //   this.navCtrl.pop();
    // }else{
    //   console.log('Lo sentimos!')
    // }

  }


}
