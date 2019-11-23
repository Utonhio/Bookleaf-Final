import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { AdminhomePage } from '../pages/adminhome/adminhome'
import { HomePage } from '../pages/home/home';
import { HomeentertainmentPage } from '../pages/homeentertainment/homeentertainment';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { InicioPage } from '../pages/inicio/inicio';
import { SelectedbookPage } from '../pages/selectedbook/selectedbook';
import { BookPage } from '../pages/book/book';
import { ProfilePage } from '../pages/profile/profile';
import { CategoryPage } from '../pages/category/category';
import { SearchbookPage } from '../pages/searchbook/searchbook';
import { FavoritesPage } from '../pages/favorites/favorites';
import { AddbookPage, FilterPipe } from '../pages/addbook/addbook';
import { EditbookPage, FilterPipeEdit } from '../pages/editbook/editbook';
import { DeleteBookPage } from '../pages/delete-book/delete-book';
import { LibraryPage } from '../pages/library/library';
import { PipesModule } from '../pipes/pipes.module';
import { ImageModalPageModule } from '../pages/image-modal/image-modal.module';


import { AuthData } from '../providers/auth-data';
import { GlobalProvider } from '../providers/global/global';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { RegistroPage } from '../pages/registro/registro';
import { LibraryProvider } from '../providers/library/library';
import { OneSignal } from '@ionic-native/onesignal';
import { EntertainmentPage } from '../pages/entertainment/entertainment';
import { EducationPage } from '../pages/education/education';
import { BusinessPage } from '../pages/business/business';
import { TemplatesPage } from '../pages/templates/templates';
import { ChapterPage } from '../pages/chapter/chapter';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AddbookPage,
    AdminhomePage,
    DeleteBookPage,
    EditbookPage,
    FilterPipe,
    FilterPipeEdit,
    ContactPage,
    HomePage,
    HomeentertainmentPage,
    TabsPage,
    RegistroPage,
    LibraryPage,
    LoginPage,
    InicioPage,
    SelectedbookPage,
    BookPage,
    ProfilePage,
    EntertainmentPage,
    EducationPage,
    BusinessPage,
    TemplatesPage,
    CategoryPage,
    SearchbookPage,
    FavoritesPage,
    ChapterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PipesModule,
    ImageModalPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AddbookPage,
    AdminhomePage,
    DeleteBookPage,
    EditbookPage,
    LibraryPage,
    LoginPage,
    InicioPage,
    RegistroPage,
    ContactPage,
    HomePage,
    HomeentertainmentPage,
    TabsPage,
    InicioPage,
    SelectedbookPage,
    BookPage,
    ProfilePage,
    EntertainmentPage,
    EducationPage,
    BusinessPage,
    TemplatesPage,
    CategoryPage,
    SearchbookPage,
    FavoritesPage,
    ChapterPage
  ],
  providers: [
    AuthData,
    GlobalProvider,
    StatusBar,
    OneSignal,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LibraryProvider,
    PayPal
  ]
})
export class AppModule {}
