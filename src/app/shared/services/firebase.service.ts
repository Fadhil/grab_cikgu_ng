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
    // Refactor to multiple location update

    let newTutor = {};
    let key = this.db.list('/tutors/').push(newTutor).key;

    newTutor['/tutors/' + tutor.id] = tutor;

    if (tutor.subjects) {
      for (let subject of tutor.subjects) {
        for (let x = 0; x < subject.levels.length; x++) {
          if (subject.levels[x]) {
            newTutor['/Location/' + tutor.city + '/' + subject.name + '/levels/' + x + '/' + tutor.id] = {name: tutor.name, email: tutor.email, rate: tutor.hourly_rate_cents? tutor.hourly_rate_cents:0};
          } else {
            newTutor['/Location/' + tutor.city + '/' + subject.name + '/levels/' + x + '/' + tutor.id] = null;
          }
        }
      }
    }
    // return this.db.object('/tutors/' + tutor.id).set(tutor);

    return this.db.object('/').update(newTutor);
  }

  getTutor(key): any {
    return this.db.object('tutors/' + key + "/").valueChanges();
  }

  searchTutor(city, level, subject) {
    // return this.db.list('users', {query: {orderByChild : "type", equalTo:'customer'}});
    return this.db.list('tutors', ref => ref.orderByChild('city').equalTo(city)).valueChanges();
  }

  searchTutorBatch(city, subject, level, batch, lastKey?) {
    console.log(city);
    console.log(subject);
    console.log(level);
    if (lastKey) {
      console.log("searchTutorBatch Firebase last key");
      console.log(lastKey);
      return this.db.list('/Location/' + city + '/' + subject + '/levels/' + level + '/', ref => ref.orderByKey().startAt(lastKey).limitToFirst(batch)).snapshotChanges();
    } else {
      return this.db.list('/Location/' + city + '/' + subject + '/levels/' + level + '/', ref => ref.limitToFirst(batch)).snapshotChanges();
    }
  }

  bookTutor(tutor) {
    // update bookTutor
    // update students/$student/booking
    // update students/$tutor/booking

    console.log("Current Student: " + JSON.stringify(this.studentProfile));

    // get push key
    let newBooking = {};
    let key = this.db.list('/tutorbooking/').push(newBooking).key;
    console.log(key);

    newBooking['/tutorbooking/' + key] = {tutor: tutor.id, tutor_email: tutor.email, subject: 'Bahasa Malaysia', student: this.studentProfile.id, student_name: this.studentProfile.name };
    newBooking['/tutors/' + tutor.id + '/bookings/' + key] = {subject: 'Bahasa Malaysia'};

    console.log(tutor.id);

    this.db.object('/').update(newBooking);

    // var updateBooking = {}
    //
    // updateBooking['/tutorbooking/' + key + '/subject/'] = 'Bahasa Inggeris';
    // updateBooking['/tutors/' + tutor.id + '/bookings/' + key + '/subject/'] = 'Bahasa Inggeris';

    // this.db.object('/').update(updateBooking);

    //How to update all keys with child to update
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
