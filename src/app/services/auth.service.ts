import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user';
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;
  constructor(public afAuth: AngularFireAuth, private asfAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => (this.isLogged = user));
  }
  
  async onRegister(user: User) { 
    try {
      return await this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      )
    } catch (error) { 
      console.log('error en registro', error);
    }
  }

    // Login
  async onLogin(user: User) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (error) {
      console.log('error en registro', error);
    }
  }

  loginGitUser() {
    return this.afAuth.signInWithPopup(new GithubAuthProvider());
  }

  loginGoogleUser() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

}
