import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as firebase from 'Firebase';
/*
  Generated class for the LibraryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LibraryProvider {
  
 
  private cart = [];
 
  
  
  constructor() {
    
  }

  //Premium
  getCategoryFantasy() {
    var categoryFantasy = [];
    var query = firebase.database().ref('books').orderByChild('genre').equalTo('Fantasia');
    query.once('value', function (snapshot) {
      snapshot.forEach(function(childSnapshot){
        categoryFantasy.push(childSnapshot.val());
      })
      
    })
   
    return categoryFantasy;
  }

  getBooksPremium() {
    var list = [];
    var query = firebase.database().ref('books').orderByChild('category').equalTo('Premium');
    query.once('value', function (snapshot) {
    snapshot.forEach(function(childSnapshot){
      list.push(childSnapshot.val());
    })

  })
    return list;
  }

  getCategoryRomance() {
    var categoryRomance = [];
    var query = firebase.database().ref('books').orderByChild('genre').equalTo('Romance');
    query.once('value', function (snapshot) {
      snapshot.forEach(function(childSnapshot){
        categoryRomance.push(childSnapshot.val());
      })
     
    })
   
    return categoryRomance;
  }

  getCategoryMysteryAndThriller() {
    var categoryMystery = [];
    var query = firebase.database().ref('books').orderByChild('genre').equalTo('Misterio');
    query.once('value', function (snapshot) {
      snapshot.forEach(function(childSnapshot){
        categoryMystery.push(childSnapshot.val());
      })
     
    })
   
    return categoryMystery;
  }

  getCategoryScienceFiction() {
    var categoryScience = [];
    var query = firebase.database().ref('books').orderByChild('genre').equalTo('Ciencia ficcion');
    query.once('value', function (snapshot) {
      snapshot.forEach(function(childSnapshot){
        categoryScience.push(childSnapshot.val());
      })
     
    })
   
    return categoryScience;
  }

  getCategoryHistory() {
    var categoryHistory = [];
    var query = firebase.database().ref('books').orderByChild('genre').equalTo('Historia');
    query.once('value', function (snapshot) {
      snapshot.forEach(function(childSnapshot){
        categoryHistory.push(childSnapshot.val());
      })
     
    })
   
    return categoryHistory;
  }


  //Gratis.

  getBooksFree() {
    var list = [];
    var query = firebase.database().ref('books').orderByChild('category').equalTo('Gratis');
    query.once('value', function (snapshot) {
    snapshot.forEach(function(childSnapshot){
      list.push(childSnapshot.val());
    })

  })
    return list;
  }

  getCategoryEducacion() {
    var categoryEducation = [];
    var query = firebase.database().ref('books').orderByChild('genre').equalTo('Educacion');
    query.once('value', function (snapshot) {
      snapshot.forEach(function(childSnapshot){
        categoryEducation.push(childSnapshot.val());
      })
      
    })
   
    return categoryEducation;
  }

  getCategoryCuento() {
    var categoryCuento = [];
    var query = firebase.database().ref('books').orderByChild('genre').equalTo('Cuento');
    query.once('value', function (snapshot) {
      snapshot.forEach(function(childSnapshot){
        categoryCuento.push(childSnapshot.val());
      })
      
    })
   
    return categoryCuento;
  }

  getCategoryLiteratura() {
    var categoryLiteratura = [];
    var query = firebase.database().ref('books').orderByChild('genre').equalTo('Literatura');
    query.once('value', function (snapshot) {
      snapshot.forEach(function(childSnapshot){
        categoryLiteratura.push(childSnapshot.val());
      })
     
    })
   
    return categoryLiteratura;
  }

  //Otras consultas

  getAllBooks(){
    var allBooks = [];
    var query = firebase.database().ref('books').orderByChild('genre');
    query.once('value', function (snapshot) {
      snapshot.forEach(function(childSnapshot){
        allBooks.push(childSnapshot.val().genre);
      })

    })

    return allBooks;
  }

  getAllBooksLibrary(){
    var allBooks = [];
    var query = firebase.database().ref('books').orderByChild('name');;
    query.once('value', function (snapshot) {
      snapshot.forEach(function(childSnapshot){
        allBooks.push(childSnapshot.val());
      })

    })

    return allBooks;
  }

  addProduct(product) {
    this.cart.push(product);
  }

  

}
