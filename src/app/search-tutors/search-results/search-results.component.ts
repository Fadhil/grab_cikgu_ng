import { AlertService } from './../../shared/services/alert.service';
import { Tutor } from './../../models/tutor';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  tutors: Tutor[] = [];
  state: '';
  constructor(
    private searchService: SearchService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route
    .queryParams
    .subscribe(params => {
        this.state = params['state'];
        this.getResults();
    });
  }

  getResults() {
    this.searchService.getTutors(this.state)
    .subscribe(
      results => {
        this.tutors = results.data;
        console.log('got tutors', this.tutors);
      },
      error => {
      console.log('Failed to get tutors:', error);
      this.alertService.error('Failed to find any Tutors');
    });
  }
}
