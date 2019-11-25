import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular'
import { ProfilePage } from '../profile/profile';
import { SelectedbookPage } from '../selectedbook/selectedbook';
import { LibraryProvider } from '../../providers/library/library';
import { InicioPage } from '../inicio/inicio';
import { FavoritesPage } from '../favorites/favorites';
import { CategoryPage } from '../category/category';
import { SearchbookPage } from '../searchbook/searchbook';
import { PurchasesPage } from '../purchases/purchases';

@IonicPage()
@Component({
  selector: 'page-homeentertainment',
  templateUrl: 'homeentertainment.html',
})
export class HomeentertainmentPage {

  @ViewChild('slide1') slide1: Slides;
  @ViewChild('slide2') slide2: Slides;
  @ViewChild('slide3') slide3: Slides;
  educacion = [];
  cuentos = [];
  literatura = [];
  constructor(public nav: NavController, private cartService: LibraryProvider) { }

  ngOnInit() {
    this.educacion = this.cartService.getCategoryEducacion();
    this.cuentos = this.cartService.getCategoryCuento();
    this.literatura = this.cartService.getCategoryLiteratura();

  }

  ionViewWillEnter() {
    //this.educacion = this.cartService.getCategoryEducacion();
    //this.cuentos = this.cartService.getCategoryCuento();
   //this.literatura = this.cartService.getCategoryLiteratura();
  }
  
  ngAfterViewInit() {
    this.slide1.slidesPerView = 3;
    this.slide1.spaceBetween = 3;

    this.slide2.slidesPerView = 3;
    this.slide2.spaceBetween = 3;

    this.slide3.slidesPerView = 3;
    this.slide3.spaceBetween = 3;

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

  openSearch() {
    this.nav.push(SearchbookPage, {
      searchFree: 'Gratuito'
    });
  }
  
  openPurchases(){
    this.nav.push(PurchasesPage);
  }

  open(book) {
    console.log('show', book);
    this.nav.push(SelectedbookPage, {
      book: book,
      bookname: book.name,
      bookurlcover: book.urlCover,

    });
  }

}
