import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Tutor } from '../../models/tutor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AlertService } from './index';


@Injectable()
export class AuthenticationService {
private authUrl = 'http://localhost:4000/api/sessions';

constructor(private http: HttpClient, private alertService: AlertService) { }

login(email, password): Observable<any> {
  return this.http.post(this.authUrl, {tutor: {email: email, password: password}});
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
}
}