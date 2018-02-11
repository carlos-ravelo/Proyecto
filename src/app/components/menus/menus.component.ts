import { Component, OnInit, ViewEncapsulation,Output,EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenusComponent implements OnInit {
@Output()closeNav = new EventEmitter();
  constructor(public afAuth: AngularFireAuth) { }
  logOut(){
    this.closeNav.emit('');
    this.afAuth.auth.signOut();
    
  }
  

  ngOnInit() {
  }

}
