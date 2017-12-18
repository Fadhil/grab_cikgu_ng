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

  constructor(private router: Router, private alertService: AlertService, public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.avatar = 'assets/img/avatar5.png';
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

    this.firebaseService.sfAuth.authState.subscribe( user => {
      if (!user) {
        localStorage.clear();
        this.router.navigateByUrl('/tutor/login');
      }
    });
  }

  logOut() {
    console.log('Logout from');
    this.firebaseService.logout().then(result => {
      this.alertService.success('Successfully Logged Out from GrabCikgu.');
    });
  }
}
