import { Tutor } from './../models/tutor';
import { AlertService } from './../shared/services/alert.service';
import { SearchService } from './../shared/services/search.service';
import { LocationService } from './../shared/services/location.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from '../models/state';
import { City } from '../models/city';
import { Subject, Subjects, Levels } from './../models/subject';
import * as _ from 'lodash';

@Component({
  selector: 'app-search-tutors',
  templateUrl: './search-tutors.component.html',
  styleUrls: ['./search-tutors.component.css']
})
export class SearchTutorsComponent implements OnInit {
  states: State[] = [];
  cities: City[] = [];
  state = '';
  tutors = [];

  city: string;
  matapelajaran: any;
  subject: any;
  levels: any;
  rate: string;
  level: number;

  constructor(
    private router: Router,
    private searchService: SearchService,
    private locationService: LocationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
      this.locationService.getStates()
      .subscribe(
        results => {
          console.log('the states: ', results);
          this.states = results;
        }
      );
  }

  onChange(state) {
    // this.router.navigate(['/search/results'], {queryParams: {state: state}});
  }

  onStateChange(state) {
    console.log("State change" + state);
    this.city = 'select';
    this.locationService.getCities(state)
      .subscribe(result => {
        console.log(result);
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

}
