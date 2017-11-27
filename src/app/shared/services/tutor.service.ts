import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Tutor } from '../../models/tutor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AlertService } from './index';

@Injectable()
export class TutorService {
private tutorsUrl = 'http://localhost:4000/api/tutors';

createTutor(tutor): Observable<Tutor> {
  console.log('Creating Tutor through api', tutor);
  return this.http.post(this.tutorsUrl, {tutor: tutor})
    // .pipe(
    //   tap(tutor => 
    //     this.alertService.success('Successfully Registered as a Tutor. Your account will be activated once reviewed by an Admin')),
    //   catchError(this.handleError('createTutor', tutor)
    // ));
}

constructor(
  private http: HttpClient, private alertService: AlertService
) { }


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


