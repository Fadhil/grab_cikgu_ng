import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { AlertService } from './index';
import * as _ from 'lodash';
import { Subject } from '../../models/subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SubjectService {
  apiUrl = environment.apiUrl;
  private subjectsUrl = this.apiUrl + '/api/subjects';

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {  }

  getSubjects(): Observable<any> {
    console.log('okkk');
    return (this.http.get(this.subjectsUrl));
  }
}
