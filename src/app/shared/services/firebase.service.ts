import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {

  public message = '';

  constructor(private db: AngularFireDatabase, public sfAuth: AngularFireAuth) {
    console.log('Firebase loaded');
  }

  createTutorWithEmailAndPassword(name, email, password): any {
    // console.log(name + " " + email + " " + password);
    this.sfAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(function(firebaseUser){
        console.log ('User created with uid ' + firebaseUser.uid);
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  getsfAuth(): AngularFireAuth {
    return this.sfAuth;
  }

  addTutor(tutor): any {
    this.db.object('/tutors/'+ tutor.id).set(tutor);
  }

  getTutor(key): any {
    return this.db.object('tutors/' + key + "/").valueChanges();
  }


  test(): any {
    return true;
  }
}
