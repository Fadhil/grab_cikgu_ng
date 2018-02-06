import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './../../../services/alert.service';
import { FirebaseService } from './../../../services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name: string;
  email: string;
  avatar: string;
  loginType: string;

  constructor(private router: Router, private alertService: AlertService, public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.loginType = localStorage.getItem('loginType');

    this.avatar = 'assets/img/avatar5.png';

    switch (this.loginType) {
      case 'tutor':
        this.loadTutor();
        break;
      case 'student':
        this.loadStudent();
        break;
      case 'admin':
        this.loadAdmin();
        break;
    }

    this.firebaseService.sfAuth.authState.subscribe( user => {
      console.log("authState");

      if (!user) {
        switch (this.loginType) {
          case 'tutor':
            // this.router.navigateByUrl('/tutor/login');
            location.assign("/tutor/login");
            break;
          case 'student':
            // this.router.navigateByUrl('/student/login');
            location.assign("/student/login");
            break;
          case 'admin':
            location.assign("/admin/login");
            break;
          default:
            location.assign('/tutor/login');
            break;
        }

        localStorage.clear();
      }
    });
  }

  loadTutor() {
    this.firebaseService.getTutor(localStorage.getItem('currentUserToken'))
      .subscribe(data => {
        console.log(data);
        this.firebaseService.tutorProfile = data;
        const d = new Date();
        const n = d.getFullYear();
        this.name = this.firebaseService.tutorProfile.name;
        this.email = this.firebaseService.tutorProfile.email;
        if (this.firebaseService.tutorProfile.gender.toUpperCase() !== 'MALE') {
          this.avatar = 'assets/img/avatar2.png';
        }
      });

  }

  loadStudent() {
    console.log(localStorage.getItem('currentUserToken'));
    this.firebaseService.getStudent(localStorage.getItem('currentUserToken'))
      .subscribe(data => {
        console.log(data);
        if (data) {
          this.firebaseService.studentProfile = data;
          const d = new Date();
          const n = d.getFullYear();
          this.name = this.firebaseService.studentProfile.name;
          this.email = this.firebaseService.studentProfile.email;
          this.avatar = 'assets/img/avatar5.png';
        }
        // if (this.firebaseService.studentProfile.gender.toUpperCase() !== 'MALE') {
        //   this.avatar = 'assets/img/avatar2.png';
        // }
      });
  }

  loadAdmin() {
    this.name = "Admin";
    this.email = "Admin";
  }

  logOut() {
    console.log('Logout from');
    this.firebaseService.logout().then(result => {
      this.alertService.success('Successfully Logged Out from GrabCikgu.');
    });
  }
}
