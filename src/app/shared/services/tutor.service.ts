import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Tutor } from '../../models/tutor';

@Injectable()
export class TutorService {


createTutor(tutor): Observable<Tutor> {
  console.log('Creating Tutor', tutor);
  return of(tutor);
}

constructor() { }

}
