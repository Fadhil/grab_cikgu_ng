import { Tutor } from './../models/tutor';
import { AlertService } from './../shared/services/alert.service';
import { SearchService } from './../shared/services/search.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-tutors',
  templateUrl: './search-tutors.component.html',
  styleUrls: ['./search-tutors.component.css']
})
export class SearchTutorsComponent implements OnInit {

  state = '';
  tutors = [];
  constructor(
    private router: Router,
    private searchService: SearchService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  onChange(state) {
    console.log('selected state: ', state);
    this.searchService.getTutors(state)
      .subscribe(
        results => {
          this.tutors = results.data;
          console.log('got tutors', this.tutors);
        },
        error => {
        console.log('Failed to get tutors:', error);
        this.alertService.error('Failed to find any Tutors');
      }
    );
  }
}
