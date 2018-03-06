import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  user: any = {};
  loading: boolean;
  constructor(
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }
  login(username, password) {
    this.loading = true;
    console.log(username, password)
    this.afAuth.auth.signInWithEmailAndPassword(username, password).then(() => {
      this.loading = false;
      this.router.navigate(['/prestamos']);

    }, error => {
      this.loading = false;
      alert(`Error Login:  ${error}`)
    });
  }
  loginConGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.router.navigate(['/prestamos']);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  ngOnInit() {
    console.log("iniciando login");
    /*  if (this.afAuth.auth.currentUser) {
       console.log(this.afAuth.auth.currentUser)
       this.router.navigate(['/clientes']);
     } */
  }

}
