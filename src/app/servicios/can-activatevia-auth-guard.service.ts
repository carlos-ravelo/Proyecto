import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class CanActivateviaAuthGuardService implements CanActivate {
  constructor(public afAuth: AngularFireAuth) { }
  canActivate() {
    console.log("autenticando")
    /*    if (this.afAuth.auth.currentUser) {
         console.log("usuario encontrado");
         return true;
       }
       else {
         console.log("usuario No encontrado")
   
         return false;
       }
    */
    return this.afAuth.auth.currentUser ? true : false;
  }

}
