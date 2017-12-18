import { RequestService } from './../../shared/services/request.service';
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
  public tutorCount = 0;
  public data;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';

  constructor(
    private searchService: SearchService,
    private requestService: RequestService,
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

    let results = this.searchService.getResults();
    console.log('got resultss', results);
  }

  getResults() {
    this.searchService.getTutors(this.state)
    .subscribe(
      results => {
        this.tutors = results.data;
        this.data = this.tutors;
        this.tutorCount = this.tutors.length;
        console.log('got tutors', this.tutors);
      },
      error => {
      console.log('Failed to get tutors:', error);
      this.alertService.error('Failed to find any Tutors');
    });
  }

  requestTutor(tutor) {
    this.router.navigate(['/requests/new', tutor.id]);
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
      return a.city.length;
  }
}
