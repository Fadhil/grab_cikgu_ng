import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from './../../shared/services/alert.service';
import { RequestService } from './../../shared/services/request.service';
import { SearchService } from './../../shared/services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
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
    this.requestService.getRequests()
      .subscribe(
        results => {
          this.data = results.data;
          console.log('got requests', this.data);
        },
        error => {
        console.log('Failed to get tutors:', error);
        this.alertService.error('Failed to find any Tutors');
      });
  }

}
