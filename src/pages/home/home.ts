import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { SelectedbookPage } from '../selectedbook/selectedbook';
import { LibraryProvider } from '../../providers/library/library';
import { Slides } from 'ionic-angular'
import { InicioPage } from '../inicio/inicio';
import { CategoryPage } from '../category/category';
import { SearchbookPage } from '../searchbook/searchbook';
import { FavoritesPage } from '../favorites/favorites';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slide1') slide1: Slides;
  @ViewChild('slide2') slide2: Slides;
  @ViewChild('slide3') slide3: Slides;
  @ViewChild('slide4') slide4: Slides;
  @ViewChild('slide5') slide5: Slides;
  @ViewChild('slide6') slide6: Slides;
  romance = [];
  fantasy = [];
  mystery = [];
  science = [];
  history = [];



  constructor(public nav: NavController, private cartService: LibraryProvider) { }

  ngOnInit() {
    this.fantasy = this.cartService.getCategoryFantasy();
    this.romance = this.cartService.getCategoryRomance();
    this.mystery = this.cartService.getCategoryMysteryAndThriller();
    this.science = this.cartService.getCategoryScienceFiction();
    this.history = this.cartService.getCategoryHistory();
  }

  ionViewWillEnter() {
    /*this.fantasy = this.cartService.getCategoryFantasy();
    this.romance = this.cartService.getCategoryRomance();
    this.mystery = this.cartService.getCategoryMysteryAndThriller();
    this.science = this.cartService.getCategoryScienceFiction();
    this.history = this.cartService.getCategoryHistory();*/
  }

  ngAfterViewInit() {
    this.slide1.slidesPerView = 3;
    this.slide1.spaceBetween = 3;

    this.slide2.slidesPerView = 3;
    this.slide2.spaceBetween = 3;

    this.slide3.slidesPerView = 3;
    this.slide3.spaceBetween = 3;

    this.slide4.slidesPerView = 3;
    this.slide4.spaceBetween = 3;

    this.slide5.slidesPerView = 3;
    this.slide5.spaceBetween = 3;

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
      searchPremium: 'Premium'
    });
  }

  open(book) {
    console.log('show', book);
    this.nav.push(SelectedbookPage, {
      book: book,
      bookname: book.name,
      bookurlcover: book.urlCover,
      searchPremium: 'premium'
    });
  }

}
