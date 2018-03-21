import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from './../../models/student';
import { AlertService } from './../../shared/services/alert.service';
import { LocationService } from '../../shared/services/location.service';
import { State } from '../../models/state';
import { City } from '../../models/city';
import * as _ from 'lodash';
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
        console.log(this.studentProfile.city);
        if (!this.studentProfile.picture) {
          if (this.studentProfile.gender.toUpperCase() !== 'MALE') {
            this.avatar = 'assets/img/avatar2.png';
          }
          else {
            this.avatar = 'assets/img/avatar5.png';
          }
        } else {
          this.avatar = this.studentProfile.picture;
        }

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

  uploadFile(event) {
    console.log("upload file");

    console.log(this.studentProfile.picture);
    const file = event.target.files[0];

    // this.tutorProfile.picture = file;
    console.log(file);
    let s = [];
    s = _.split(file.type, '/')
    let filetype = _.split(file.name, '.');
    console.log(s[0]);

    if(s[0]=='image' && file.size <= 100000){
      const filePath = 'gambar/' + this.studentProfile.id;
      const task = this.firebaseService.storage.upload(filePath, file);
      console.log(task);
      task.downloadURL().subscribe(s => {
        this.studentProfile.picture = s;
        // this.firebaseService.updateTutorPic(this.profile)
        this.avatar = s;
        console.log(s);
      });
      // this.avatar = task.downloadURL();
    }
    else {
      $('#pic_avtr').val('');
      if(s[0]!='image'){
        console.log("File is not an image");
        this.alertService.error('File is not an image');
      }
      else
      {
        console.log("Image size is too big");
        this.alertService.error('Image size is too big');
      }
    }
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
