import { Component, OnInit, NgZone } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  email: string;
  password: string;
  token = '';

  constructor(
    private alertService: AlertService,
    private router: Router,
    public firebaseService: FirebaseService,
    private zone: NgZone
  ) { }

  ngOnInit() {

  }

  login() {
    this.firebaseService.login(this.email, this.password)
      .then( firebaseUser => {
        console.log(firebaseUser);
        localStorage.setItem('currentUserToken', firebaseUser.uid);
        localStorage.setItem('loginType', 'admin');

        this.firebaseService.getAdmin(firebaseUser.uid)
          // .subscribe(data => {
          //
          // });
          location.assign('/admin/students');
          this.alertService.success('Successfully logged in', true);
      })
      .catch( error => {
        this.alertService.error(error, true);
      });
  }
}
