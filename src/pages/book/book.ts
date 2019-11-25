import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController, Events, LoadingController } from 'ionic-angular';
import { ChapterPage } from '../../pages/chapter/chapter';
import firebase from 'firebase';

declare var ePub: any;
@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  loading: any;
  book: any;
  currentPage: number = 1;
  totalPages: any; 
  pageTitle: string;
  bookname = '';
  showToolbars: boolean = true;
  showIonRange: boolean = false;
  showLoading: boolean = true;
  bgColor: any;
  toolbarColor: string = 'light';

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public popoverCtrl: PopoverController,
    public events: Events,
    public navParams: NavParams,
    private loadingCtrl: LoadingController
  ) {
    var book = this.navParams.get('book');
    this.bookname = this.navParams.get('bookname');
    this.platform.ready().then(() => {

      this.book = ePub(book.file);
      //Prueba
      
      //
      this.book.on('book:pageChanged', (location) => {
      
        this._updateCurrentPage();
        this._updatePageTitle();
      });
      
      this._updateTotalPages();

      this.book.getToc().then(toc => {
        this._updatePageTitle();
        this.loading.dismiss();
        
      });

      this._subscribeToEvents();
    });
  }

  ionViewDidLoad() {
 
    this.book.renderTo("book"); 
  }

  cambioRango ( event ){
    this.book.gotoPage(event.value);
  }

  ngOnInit(){
    this.presentLoading();

  }
  
  async presentLoading(){
    this.loading = await this.loadingCtrl.create({
      content: 'Cargando libro...'
    });
    return this.loading.present();
  }

  _subscribeToEvents() {

    this.events.subscribe('select:toc', (content) => {
      this.book.goto(content.href);
    });  

 
    this.events.subscribe('select:background-color', (bgColor) => {
  
      this.book.setStyle("background-color", bgColor);
      this.bgColor = bgColor;
      
      if (bgColor == 'rgb(255, 255, 255)' || bgColor == 'rgb(249, 241, 228)') { 
        this.toolbarColor = 'light';
      }
      else {
        this.toolbarColor = 'dark';
      }
    });

  
    this.events.subscribe('select:color', (color) => {
      console.log('select:color', color);
      this.book.setStyle("color", color);
    });

   
    this.events.subscribe('select:font-family', (family) => {
    
      this.book.setStyle("font-family", family);
      this._updateTotalPages();
    });

  
    this.events.subscribe('select:font-size', (size) => {
    
      this.book.setStyle("font-size", size);
      this._updateTotalPages();
    });

  }

  _updateCurrentPage() {
    
    let currentLocation = this.book.getCurrentLocationCfi();
    let page = this.book.pagination.pageFromCfi(currentLocation)
    
    this.currentPage = page;
  }

  
  
  _updatePageTitle() {
    
    let bookTitle = this.book.metadata.bookTitle;
    let pageTitle = bookTitle; 
    if (this.book.toc) {
     
      let chapter = this.book.toc.filter(obj => obj.href == this.book.currentChapter.href)[0]; 
      pageTitle = chapter ? chapter.label : bookTitle; 
    }
    
    this.pageTitle = pageTitle;
  }
  
  prev() {
    
    if (this.currentPage == 2) { 
      this.book.gotoPage(1);
    } else {
      this.book.prevPage();
    }
  }
  
  next() {
    this.book.nextPage();
    
  }
  
  
  toc(ev) {
    
    let popover = this.popoverCtrl.create(ChapterPage, {
      toc: this.book.toc
    });
    popover.present({ ev });
  }
  
  
  toggleToolbars() {
    
    this.showToolbars = !this.showToolbars;
  }
  
  changePage(event) {
    
    if (event.velocityX < 0) { 
      this.next();
      this.getLastUserPage();
    }
    else {
      this.prev();
      this.getLastUserPage();
    }
  }
  _updateTotalPages() {
    
    this.book.generatePagination().then(() => {
      
      let totalPages = this.book.pagination.totalPages;
      
      this.totalPages = `of ${totalPages}`; 
      this.showLoading = false;
      this.showIonRange = true;
      
    }).catch(error => {
     
    });
  }
  
  getLastUserPage(){
    var user = firebase.auth().currentUser;
    let currentLocation = this.book.getCurrentLocationCfi();
    let page = this.book.pagination.pageFromCfi(currentLocation);
    firebase.database().ref('usuarios/' + user.uid + '/Leidos/' + this.bookname).update({
      pagina: page
    });
    
  }
  
  goToLastUserPage() {
    var list = [];
    var user = firebase.auth().currentUser;
    var query = firebase.database().ref('usuarios/' + user.uid + '/Leidos/' + this.bookname).orderByChild('pagina');
    query.once('value', function (snapshot) {
      list.push(snapshot.val())
    })
    return list;
  }
  
  
}

