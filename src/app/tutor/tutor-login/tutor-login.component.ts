import { AlertService } from './../../shared/services/alert.service';
// import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-tutor-login',
  templateUrl: './tutor-login.component.html',
  styleUrls: ['./tutor-login.component.css']
})
export class TutorLoginComponent implements OnInit {
  email = '';
  password = '';
  token = '';
  // fbAuth: any;


  constructor(
    private alertService: AlertService,
    private router: Router,
    public firebaseService: FirebaseService,
    private zone: NgZone
    )
    {
      // this.fbAuth = this.firebaseService.sfAuth.auth;
    }

  ngOnInit() {
  }

  login2(): void {

    this.firebaseService.login(this.email, this.password)
      .then( firebaseUser => {
        console.log("login2");
        console.log(firebaseUser);
        localStorage.setItem('currentUserToken', firebaseUser.uid);
        localStorage.setItem('loginType', 'tutor');

        this.firebaseService.getTutor(firebaseUser.uid)
          .subscribe(data => {
            this.firebaseService.tutorProfile = data;
          });

          location.assign('/tutor/profile');
          this.alertService.success('Successfully logged in', true);
      })
      .catch( error => {
        this.alertService.error(error, true);
      });
  }
}
