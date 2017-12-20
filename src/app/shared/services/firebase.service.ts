import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Tutor } from './../../models/tutor';
import { Student } from './../../models/student';

@Injectable()
export class FirebaseService {

  public message = '';
  public tutorProfile: Tutor;
  public studentProfile: Student;

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

  login(email, password, type = 0): any {
    console.log('Login to GrabCikgu thru Firebase');
    return this.sfAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): any {
    return this.sfAuth.auth.signOut();
  }

  getsfAuth(): AngularFireAuth {
    return this.sfAuth;
  }

  addTutor(tutor): any {
    return this.db.object('/tutors/' + tutor.id).set(tutor);
  }

  getTutor(key): any {
    return this.db.object('tutors/' + key + "/").valueChanges();
  }

  searchTutor(city, level, subject) {
    // return this.db.list('users', {query: {orderByChild : "type", equalTo:'customer'}});
    return this.db.list('tutors', ref => ref.orderByChild('city').equalTo(city)).valueChanges();
  }

  addStudent(student): any {
    return this.db.object('/students/' + student.id).set(student);
  }

  getStudent(key): any {
    return this.db.object('students/' + key + '/').valueChanges();
  }

  test(): any {
    return true;
  }
}
