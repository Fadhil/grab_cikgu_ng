import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { LocationService } from '../../shared/services/location.service';
import { Router } from '@angular/router';
import { State } from '../../models/state';
import { City } from '../../models/city';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Tutor } from './../../models/tutor';
import { Subject, Subjects, Levels } from './../../models/subject';
import * as _ from 'lodash';

@Component({
  selector: 'app-student-people',
  templateUrl: './student-people.component.html',
  styleUrls: ['./student-people.component.css']
})
export class StudentPeopleComponent implements OnInit {
  states: State[] = [];
  cities: City[] = [];
  state: string;
  city: string;
  matapelajaran: any;
  subject: any;
  levels: any;
  rate: string;
  level: number;

  tutors: any;

  constructor(
    private alertService: AlertService,
    private locationService: LocationService,
    private router: Router,
    public firebaseService: FirebaseService,
  ) {
    this.matapelajaran = Subjects;
    this.levels = Levels;
   }

  ngOnInit() {
    this.locationService.getStates()
    .subscribe(results => {
      this.states = results;
    });

    this.state = 'select';
    this.city = 'select';
    this.rate = 'select';
    this.level = -1;
    this.subject = 'select';
  }

  onStateChange(state) {
    this.city = 'select';
    this.locationService.getCities(state)
      .subscribe(result => {
        this.cities = result;
      }, error => {
         this.alertService.error('Failed to find cities for ' + state);
      });
  }

  onLevelChange(level) {
    this.matapelajaran = _.filter(Subjects, function(o){
      return o.levels[level];
    });
    this.subject = 'select';
  }

  searchTutor() {

    const s = this.subject;
    const l = this.level;

    this.firebaseService.searchTutor(this.city, this.level, this.subject)
      .subscribe(tutors => {
        this.tutors = _.filter(tutors, function(o){
          const p = o['subjects'];
          if (p) {
            if (p[s].levels[l]) {
              return true;
            }
          }
        });

        if (this.tutors.length > 0) {
          this.alertService.success("Found " + this.tutors.length + " match");
        }
      });
  }
}
