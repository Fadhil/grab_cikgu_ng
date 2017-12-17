import { Tutor } from './../models/tutor';
import { AlertService } from './../shared/services/alert.service';
import { SearchService } from './../shared/services/search.service';
import { LocationService } from './../shared/services/location.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from '../models/state';
import { City } from '../models/city';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-search-tutors',
  templateUrl: './search-tutors.component.html',
  styleUrls: ['./search-tutors.component.css']
})
export class SearchTutorsComponent implements OnInit {
  states: State[] = [];
  cities: City[] = [];
  subjects: Subject[] = [{id: 1, name: "testt", level: "qwerty"}];

  selectedState = '';
  selectedCity = '';
  selectedSubject = '';
  selectedRate = '';

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

  onStateChange(stateName) {
    this.locationService.getCities(stateName)
      .subscribe(result => {
        this.cities = result;
        this.selectedState = stateName;
      }, error => {
         this.alertService.error('Failed to find cities for ' + stateName);
      });
  }

  onCityChange(cityName){
    this.selectedCity = cityName;
  }

  onSubjectChange(subjectName){
    this.selectedSubject = subjectName;
  }

  search() {
    console.log ("thsi is : ", this);
  }
}
