import { Injectable } from '@angular/core';
import {CanActivate} from'@angular/router'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class CanActivateviaAuthGuardService implements CanActivate{
  
  

  constructor(public afAuth: AngularFireAuth) { }
  canActivate(){
    if (this.afAuth.auth.currentUser)return true;
    return false;
  }

}
