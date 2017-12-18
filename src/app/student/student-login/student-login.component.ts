import { AlertService } from './../../shared/services/alert.service';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  email = '';
  password = '';
  token = '';
  fbAuth: any;

  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    public firebaseService: FirebaseService) {
      this.fbAuth = this.firebaseService.sfAuth.auth;
    }

  ngOnInit() {
  }

  login(): void {
    this.fbAuth.signInWithEmailAndPassword(this.email, this.password)
      .then( firebaseUser => {
        console.log(firebaseUser);
        localStorage.setItem('currentUserToken', firebaseUser.uid);
        this.alertService.success('Successfully logged in.', true);
        this.router.navigate(['/student/profile']);
      })
      .catch( error => {
        this.alertService.error(error);
      });
  }


  logout(): void {
    this.authenticationService.logout();
  }

}
