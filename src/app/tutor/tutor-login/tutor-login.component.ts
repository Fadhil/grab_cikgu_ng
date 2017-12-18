import { AlertService } from './../../shared/services/alert.service';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
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
  fbAuth: any;


  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    public firebaseService: FirebaseService)
    {
      this.fbAuth = this.firebaseService.sfAuth.auth;
    }

  ngOnInit() {
  }

  login(): void {
    this.authenticationService.login(this.email, this.password)
      .subscribe(
        result => {
          console.log("RESULT authenticating", result);
          localStorage.setItem('currentUserToken', result.data.token);
          this.router.navigate(['/tutor/profile']);
          this.alertService.success('Successfully logged in.', true);
        },
        error => {
          this.alertService.error(error.error);
        }
      );
  }

  login2(): void {
    this.fbAuth.signInWithEmailAndPassword(this.email, this.password)
      .then( firebaseUser => {
        console.log("RESULT: " + firebaseUser);
        localStorage.setItem('currentUserToken', firebaseUser.uid);

        this.router.navigate(['/tutor/profile']);
        this.alertService.success('Successfully logged in.', false);
      })
      .catch( error => {
        this.alertService.error(error, true);
      });
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
