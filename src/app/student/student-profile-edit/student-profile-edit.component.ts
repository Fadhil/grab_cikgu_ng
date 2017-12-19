import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from './../../models/student';
import { AlertService } from './../../shared/services/alert.service';
import { LocationService } from '../../shared/services/location.service';
import { State } from '../../models/state';
import { City } from '../../models/city';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-student-profile-edit',
  templateUrl: './student-profile-edit.component.html',
  styleUrls: ['./student-profile-edit.component.css']
})
export class StudentProfileEditComponent implements OnInit {
  states: State[] = [];
  cities: City[] = [];
  studentProfile = new Student();
  avatar: string;
  student_observable: any;


  constructor(
    private alertService: AlertService,
    private locationService: LocationService,
    private router: Router,
    public firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    $('.tooltip').hide();

    this.locationService.getStates()
    .subscribe(results => {
      this.states = results;
    });

    this.avatar = 'assets/img/avatar5.png';
    this.student_observable = this.firebaseService.getStudent(localStorage.getItem('currentUserToken'))
      .subscribe(data => {
        this.studentProfile = data;
        this.avatar = 'assets/img/avatar5.png';
        // const d = new Date();
        // const n = d.getFullYear();
        // this.tutorProfile.age = n - this.tutorProfile.byear;
        // if (!this.tutorProfile.subjects) {
        //   this.resetSubjects();
        // }
        //
        // if (this.tutorProfile.gender.toUpperCase() !== 'MALE') {
        //   this.avatar = 'assets/img/avatar2.png';
        // }

        // this.onStateChange(this.tutorProfile.state);

      });
  }

  saveProfile2() {
    // this.tutorProfile.subjects = null;
    // this.tutorProfile.subjects = this.subjects;
    // console.log(this.subjects);
    let c = this.firebaseService.addStudent(this.studentProfile)
      .then(result => {
        this.router.navigateByUrl('/student/profile');
        this.alertService.success('Successfully Updated Profile');
      })
      .catch(error => {
        // this.router.navigateByUrl('/tutor/profile');
        this.alertService.error(error);
      });

  }

  onStateChange(state) {
    this.locationService.getCities(state)
      .subscribe(result => {
        this.cities = result;
      }, error => {
         this.alertService.error('Failed to find cities for ' + state);
      });
  }


}
