import { Router } from '@angular/router';
import { Tutor } from './../../models/tutor';
import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { TutorService } from '../../shared/services/tutor.service';
import { LocationService } from '../../shared/services/location.service';
import { State } from '../../models/state';
import { City } from '../../models/city';
import * as _ from 'lodash';
import { FirebaseService } from '../../shared/services/firebase.service';

declare var $:JQueryStatic;

@Component({
  selector: 'app-tutor-profile-edit',
  templateUrl: './tutor-profile-edit.component.html',
  styleUrls: ['./tutor-profile-edit.component.css']
})
export class TutorProfileEditComponent implements OnInit {
  states: State[] = [];
  cities: City[] = [];
  tutorProfile = new Tutor();

  hourlyRate = 0;
  anArray = [false, false];
  subjects = [];
  avatar: string;
  tutor_list_observable: any;
  pic_msg: string;
  profile_url: any;
  pic_observable: any;


  constructor(private tutorService: TutorService,
  private alertService: AlertService,
  private locationService: LocationService,
  private router: Router,
  public firebaseService: FirebaseService,
  ) {
    this.resetSubjects();
  }

  resetSubjects(){
    this.tutorProfile.subjects = [];
    this.tutorProfile.subjects[0] = {name: 'Bahasa Malaysia', levels: [false, false, false, false]};
    this.tutorProfile.subjects[1] = {name: 'Bahasa Inggeris', levels: [false, false, false, false]};
    this.tutorProfile.subjects[2] = {name: 'Bahasa Cina', levels: [false, false, false, false]};
    this.tutorProfile.subjects[3] = {name: 'Mathematics', levels: [false, false, false, false]};
    this.tutorProfile.subjects[4] = {name: 'Science', levels: [false, false, false, false]};
    this.tutorProfile.subjects[5] = {name: 'Geography', levels: [false, false, false, false]};
    this.tutorProfile.subjects[6] = {name: 'History', levels: [false, false, false, false]};
    this.tutorProfile.subjects[7] = {name: 'Accounts', levels: [false, false, false, false]};
    this.tutorProfile.subjects[8] = {name: 'Economics', levels: [false, false, false, false]};
    this.tutorProfile.subjects[9] = {name: 'Business', levels: [false, false, false, false]};
    this.tutorProfile.subjects[10] = {name: 'Biology', levels: [false, false, false, false]};
    this.tutorProfile.subjects[11] = {name: 'Physics', levels: [false, false, false, false]};
    this.tutorProfile.subjects[12] = {name: 'Chemistry', levels: [false, false, false, false]};
    this.tutorProfile.subjects[13] = {name: 'Add Math', levels: [false, false, false, false]};
  }

  ngOnInit() {
    // Hides tooltip when switching between save/edit

    $('.tooltip').hide();

    this.locationService.getStates()
    .subscribe(results => {
      this.states = results;
    });

    this.tutorProfile.id = localStorage.getItem('currentUserToken');

    this.avatar = 'assets/img/avatar5.png';

    const ref = this.firebaseService.storage.ref('gambar/' + this.tutorProfile.id);
    console.log(ref);
    this.profile_url = ref.getDownloadURL();
    console.log(this.profile_url);

    this.pic_observable = this.profile_url.subscribe(d => {
      console.log("has changed");
      console.log(d);
      this.avatar = d;
    });

    this.tutor_list_observable = this.firebaseService.getTutor(this.tutorProfile.id)
      .subscribe(data => {
        this.tutorProfile = data;
        const d = new Date();
        const n = d.getFullYear();
        this.tutorProfile.age = n - this.tutorProfile.byear;
        if (!this.tutorProfile.subjects) {
          this.resetSubjects();
        }

        if (this.tutorProfile.gender.toUpperCase() !== 'MALE') {
          // this.avatar = 'assets/img/avatar2.png';
        }

        this.onStateChange(this.tutorProfile.state);

      });
  }

  display_change(newValue) {
    console.log(newValue);
  }

  saveProfile() {
    this.tutorProfile.subjects = this.summarizeSubjects(this.subjects);
    this.tutorProfile.hourly_rate_cents = (this.hourlyRate * 100);
    console.log('saving profile with attrs:', this.tutorProfile);
    this.tutorService.updateTutorProfile(this.tutorProfile)
      .subscribe(result => {
        this.router.navigateByUrl('/tutor/profile');
        this.alertService.success('Successfully Updated Profile');
      },
      error => {
        console.log('Failed to update profile:', error);
        this.alertService.error('Failed to Update Profile');
      });
  }

  saveProfile2() {
    // this.tutorProfile.subjects = null;
    // this.tutorProfile.subjects = this.subjects;
    // console.log(this.subjects);
    // console.log(this.tutorProfile);
    let c = this.firebaseService.addTutor(this.tutorProfile)
      .then(result => {
        this.router.navigateByUrl('/tutor/profile');
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

  summarizeSubjects(subjects) {
    let that = this;
    let sString = '';
    sString =  _.reduce(subjects, function(val, subject){
      if(that.subjectIsSelected(subject) == true) {
        val =  val + that.getSubjectName(subject);
      }
      return val;
    }, '');
    sString = _.trimEnd(sString, ', ');
    return sString;
  }

  subjectIsSelected(subject) {
    return _.compact(subject.levels)[0] == true
  }

  getSubjectName(subject) {
    let levelNames = [
      '(Pri 1 - 3)', '(Pri 4 - 5)', '(Form 1 - 3)', '(Form 4 - 5)'
    ]
    let sName = '';
    for(var i = 0; i < subject.levels.length - 1; i ++ ){
      if(subject.levels[i] == true){
        sName = sName + subject.name + ' ' + levelNames[i] + ', ';
      }
    }
    return sName;
  }

  checkIfSelected(subject, id) {
    return subject.levels[id];
  }

  updateSelectedSubjects(subjects) {
    let that = this;
    let levelNames = [
      '(Pri 1 - 3)', '(Pri 4 - 5)', '(Form 1 - 3)', '(Form 4 - 5)'
    ]
    let splitSubjects = _.split(subjects, ', ');
    let subjectsArray = _.map(splitSubjects, function(x){
      let rep = _.replace(x, '(', '=(');
      return _.split(rep, ' =');
    });

    _.forEach(subjectsArray, function(x){
      let subject = _.find(that.subjects, { 'name': x[0]});
      let levelIndex = levelNames.indexOf(x[1]);
      subject.levels[levelIndex] = true;
    });
  }

  uploadFile(event) {
    console.log("upload file");

    console.log(this.tutorProfile.picture);
    const file = event.target.files[0];

    // this.tutorProfile.picture = file;
    console.log(file);
    let s = [];
    s = _.split(file.type, '/')
    let filetype = _.split(file.name, '.');
    console.log(s[0]);

    if(s[0]=='image' && file.size <= 100000){
      const filePath = 'gambar/' + this.tutorProfile.id;
      const task = this.firebaseService.storage.upload(filePath, file);
      console.log(task);
      task.downloadURL().subscribe(s => {
        this.tutorProfile.picture = s;
        // this.firebaseService.updateTutorPic(this.profile)
        this.avatar = s;
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
}
