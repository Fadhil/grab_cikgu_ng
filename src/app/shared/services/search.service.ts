import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Tutor } from '../../models/tutor';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AlertService } from './index';

@Injectable()
export class SearchService {
  apiUrl = environment.apiUrl;
  private tutorsUrl = this.apiUrl + '/api/tutors';
  private tutorUrl = this.apiUrl + '/api/tutor';
  private searchUrl = this.apiUrl + '/api/search';

  public data = {};


  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  getTutors(state): Observable<any> {
    let params = new HttpParams;
    params = params.append('state', state);
    return this.http.get(this.tutorsUrl, {params: params});
  }

  findTutor(searchParams): Observable<any> {
    
    console.log('searchurl - searchparams', searchParams);
    return this.http.post(this.searchUrl, searchParams);
  }

  saveResults(results) {
    this.data = results.data;
  }

  getResults() {
    console.log('getresults thisdata', this.data);
    return this.data;
  }


}
