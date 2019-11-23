import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class AuthData {
  constructor() {}

  /**
   * [loginUser We'll take an email and password and log the user into the firebase app]
    @param  {string} email   
    @param  {string} password 
   */
  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
    
  }

  /**
   * [signupUser description]
   * This function will take the user's email and password and create a new account on the Firebase app, once it does
   * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
   * that node to store the profile information.
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  signupUser(email: string, password: string, nickname: string, role: string, grade: string): Promise<any> {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
         
        firebase.database().ref('/userProfile').child(newUser.user.uid).set({
            firstName: nickname.toString(),
             email: email,
             role: role.toString(),
             grade: grade.toString()
      });
    });
  }

  /**
   * [resetPassword description]
   * This function will take the user's email address and send a password reset link, then Firebase will handle the
   * email reset part, you won't have to do anything else.
   *
   * @param  {string} email    [User's email address]
   */
  resetPassword(email: string): Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  
  logoutUser(): Promise<any> {
    return firebase.auth().signOut();
  }

}
