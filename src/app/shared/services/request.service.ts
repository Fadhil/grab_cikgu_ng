import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Tutor } from '../../models/tutor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AlertService } from './index';

@Injectable()
export class RequestService {
apiUrl = environment.apiUrl;
private requestsUrl = this.apiUrl + '/api/requests';

constructor(
  private http: HttpClient, private alertService: AlertService
) { }

createRequest(request): Observable<any> {
  const userToken = localStorage.getItem('currentUserToken');
  const headers = new HttpHeaders().set('Authorization', userToken);

  console.log('Creating Request through api', request);
  return this.http.post(this.requestsUrl, {request: request}, {headers: headers});
}

getRequests(): Observable<any> {
  const userToken = localStorage.getItem('currentUserToken');
  const headers = new HttpHeaders().set('Authorization', userToken);

  console.log('Getting requests through api');
  return this.http.get(this.requestsUrl, {headers: headers});
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.log(error); // log to console instead
    this.alertService.error(error);
    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}

