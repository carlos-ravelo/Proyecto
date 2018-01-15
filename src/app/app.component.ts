import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'paymeLater';
  loading: boolean;
  logged: boolean;
  constructor(public afAuth: AngularFireAuth,
    private router: Router  )   
{

  }


  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  /*   this.router.events.subscribe(()=>{
      if (this.router.url!="/login") this.Checklogin();   */
/* 
    }) */
  }
  
  Checklogin() {
    if (this.afAuth.auth.currentUser) {
      this.logged = true;
    }
    else
      this.logged = false;
      this.router.navigate(['/login']);

  }}
