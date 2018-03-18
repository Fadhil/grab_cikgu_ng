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

  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    public firebaseService: FirebaseService) {
      // this.fbAuth = this.firebaseService.sfAuth.auth;
    }

  ngOnInit() {
  }

  login(): void {
    this.firebaseService.login(this.email, this.password)
      .then( firebaseUser => {
        console.log(firebaseUser);
        localStorage.setItem('currentUserToken', firebaseUser.uid);
        localStorage.setItem('loginType', 'student');


        this.firebaseService.getStudent(firebaseUser.uid)
          .subscribe(data => {
            if(data){
              this.alertService.success('Successfully logged in.', true);

              this.firebaseService.studentProfile = data;
              if (this.firebaseService.studentProfile.state != ''){
                location.assign('/student/profile');
              }
              else {
                location.assign('/student/people');
              }
            } else {
              this.alertService.error("User is not a registered student");
              // this.firebaseService.logout().then(result => {
              //   this.alertService.error("User is not a registered student");
              // });
            }
          });


      })
      .catch( error => {
        this.alertService.error(error);
      });
  }


  logout(): void {
    this.authenticationService.logout();
  }

}
