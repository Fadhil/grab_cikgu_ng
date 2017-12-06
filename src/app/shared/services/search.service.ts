import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Tutor } from '../../models/tutor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AlertService } from './index';

@Injectable()
export class SearchService {
  apiUrl = environment.apiUrl;
  private tutorsUrl = this.apiUrl + '/api/tutors';
  private tutorUrl = this.apiUrl + '/api/tutor';
  constructor(
    private http: HttpClient, private alertService: AlertService
  ) { }

  getTutors(state): Observable<any> {
    return this.http.get(this.tutorsUrl + '?state=' + state);
  }
}
