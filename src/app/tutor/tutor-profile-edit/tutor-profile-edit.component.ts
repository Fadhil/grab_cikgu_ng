import { Router } from '@angular/router';
import { Tutor } from './../../models/tutor';
import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { TutorService } from '../../shared/services/tutor.service';
import { LocationService } from '../../shared/services/location.service';
import { State } from '../../models/state';
import { City } from '../../models/city';
import * as _ from 'lodash';
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



  constructor(private tutorService: TutorService,
  private alertService: AlertService,
  private locationService: LocationService,
  private router: Router
  ) {
  }

  ngOnInit() {
    // Hides tooltip when switching between save/edit
    this.subjects[0] = {name: 'Bahasa Malaysia', levels: [false, false, false,false]};
    this.subjects[1] = {name: 'Bahasa Inggeris', levels: [false, false, false,false]};
    this.subjects[2] = {name: 'Bahasa Cina', levels: [false, false, false,false]};
    this.subjects[3] = {name: 'Mathematics', levels: [false, false, false,false]};
    this.subjects[4] = {name: 'Science', levels: [false, false, false,false]};
    this.subjects[5] = {name: 'Geography', levels: [false, false, false,false]};
    this.subjects[6] = {name: 'History', levels: [false, false, false,false]};
    this.subjects[7] = {name: 'Accounts', levels: [false, false, false,false]};
    this.subjects[8] = {name: 'Economics', levels: [false, false, false,false]};
    this.subjects[9] = {name: 'Business', levels: [false, false, false,false]};
    this.subjects[10] = {name: 'Biology', levels: [false, false, false,false]};
    this.subjects[11] = {name: 'Physics', levels: [false, false, false,false]};
    this.subjects[12] = {name: 'Chemistry', levels: [false, false, false,false]};
    this.subjects[13] = {name: 'Add Math', levels: [false, false, false,false]};
    this.subjects[14] = {name: 'Bahasa Malaysia', levels: [false, false, false,false]};
    this.subjects[15] = {name: 'Bahasa Malaysia', levels: [false, false, false,false]};
    this.subjects[16] = {name: 'Bahasa Malaysia', levels: [false, false, false,false]};

    $('.tooltip').hide();
    this.tutorService.getTutorProfile()
    .subscribe(result => {
      this.tutorProfile = result;
      this.updateSelectedSubjects(this.tutorProfile.subjects);
    });

    this.locationService.getStates()
    .subscribe(results => {
      this.states = results;
    })
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
}
