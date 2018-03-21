import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  avatar: string;
  student_observable: any;
  studentProfile = new Student();

  constructor(
    private alertService: AlertService,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    $('.tooltip').hide();
    this.avatar = 'assets/img/avatar5.png';

    this.student_observable = this.firebaseService.getStudent(localStorage.getItem('currentUserToken'))
      .subscribe(data => {
        this.studentProfile = data;
        // console.log(this.studentProfile.city);
        if(!this.studentProfile.picture) {
          if (this.studentProfile.gender.toUpperCase() !== 'MALE') {
            this.avatar = 'assets/img/avatar2.png';
          }
          else {
            this.avatar = 'assets/img/avatar5.png';
          }
        } else {
          this.avatar = this.studentProfile.picture;

        }

        if (this.studentProfile.state == '' || !this.studentProfile.state) {
          this.alertService.error("Please complete your student profile to start using the system");
          console.log("Please complete your profile");
        }
        const d = new Date();
        const n = d.getFullYear();
        // this.tutorProfile.age = n - this.tutorProfile.byear;
        //
        // if (this.tutorProfile.gender.toUpperCase() !== 'MALE') {
        //   this.avatar = 'assets/img/avatar2.png';
        // }

      });
  }

}
