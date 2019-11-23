import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LibraryProvider } from '../../providers/library/library';
import { SelectedbookPage } from '../selectedbook/selectedbook';
import { AddbookPage } from '../addbook/addbook';
import { LibraryPage } from '../library/library';
import { CategoryPage } from '../category/category';
import { FavoritesPage } from '../favorites/favorites';
import { InicioPage } from '../inicio/inicio';
import { ProfilePage } from '../profile/profile';
import { SearchbookPage } from '../searchbook/searchbook';

@IonicPage()
@Component({
  selector: 'page-adminhome',
  templateUrl: 'adminhome.html',
})
export class AdminhomePage {
  @ViewChild('slide1') slide1: Slides;
  @ViewChild('slide2') slide2: Slides;
  gratuitos = [];
  premium = [];

  constructor(public nav: NavController, public navParams: NavParams, private cartService: LibraryProvider) {
  }

  ngOnInit() {
    this.gratuitos = this.cartService.getBooksFree();
    this.premium = this.cartService.getBooksPremium();
  }

  ionViewWillEnter() {
    this.gratuitos = this.cartService.getBooksFree();
    this.premium = this.cartService.getBooksPremium();
  }

  ngAfterViewInit() {
    this.slide1.slidesPerView = 3;
    this.slide1.spaceBetween = 3;

    this.slide2.slidesPerView = 3;
    this.slide2.spaceBetween = 3;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminhomePage');
  }

  openProfile() {
    this.nav.push(ProfilePage);
  }

  returnType() {
    this.nav.push(InicioPage);
  }

  openFavorites() {
    this.nav.push(FavoritesPage);
  }

  openCategory() {
    this.nav.push(CategoryPage);
  }

  openLibrary() {
    this.nav.push(LibraryPage);
  }

  openAddBook(book) {
    this.nav.push(AddbookPage, {
      book: book
    });
  }

  openSearch() {
    this.nav.push(SearchbookPage, {
      searchFree: 'Gratuito',
      searchPremium: 'Premium'
    });
  }

  open(book) {
    console.log('show', book);
    this.nav.push(SelectedbookPage, {
      book: book,
      bookname: book.name
    });
  }





}
