import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { CanActivateviaAuthGuardService } from './servicios/can-activatevia-auth-guard.service'
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

declare var device;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'paymeLater';
  loading: boolean;
  logged: boolean;
  constructor(public afAuth: AngularFireAuth,
    private router: Router, public canActivate: CanActivateviaAuthGuardService) {

  }
  logOut(){
    this.afAuth.auth.signOut();
  }
  ngOnInit() {
    this.logged = false;
    this.afAuth.auth.onAuthStateChanged(((a: firebase.User) => {
      if (a) {
        this.logged = true;
        this.router.navigateByUrl("/clientes")
      }
      else {
        this.logged = false;
        this.router.navigateByUrl("/login")
      }
    }));
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      alert(device.platform);
    }
  }
}


