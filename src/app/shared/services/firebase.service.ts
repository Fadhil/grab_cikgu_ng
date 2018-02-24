import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import { Tutor } from './../../models/tutor';
import { Student } from './../../models/student';
import * as _ from 'lodash';
import { LocationService } from './location.service';

@Injectable()
export class FirebaseService {

  public message = '';
  public tutorProfile: Tutor;
  public studentProfile: Student;

  constructor(private db: AngularFireDatabase,
    public sfAuth: AngularFireAuth,
    private locationService: LocationService,
    public storage: AngularFireStorage) {
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
    let newTutor = {};
    let key = this.db.list('/tutors/').push(newTutor).key; //this creates a key

    if (tutor.subjects) {
      for (let subject of tutor.subjects) {
        for (let x = 0; x < subject.levels.length; x++) {
          if (subject.levels[x]) {
            // console.log(tutor.area_covered);
            // console.log(this.locationService.CITIES.length);

            this.locationService.getCities(tutor.state)
              .subscribe(cities => {
                for (let city in cities) {
                  //if the city is in the covered area then update
                  let result = _.find(tutor.area_covered, function(o){
                    return o == cities[city].name;
                  });
                  if(result){
                      // console.log(tutor.area_covered[city]);
                      //Update all the cities if cities = true then add newtutor
                      newTutor['/Location/' + cities[city].name + '/' +
                      subject.name + '/levels/'
                      + x + '/' + tutor.id] = {name: tutor.name,
                                              email: tutor.email? tutor.email : '',
                                              picture: tutor.picture? tutor.picture : '',
                                              occupation: tutor.occupation? tutor.occupation : '',
                                              qualification: tutor.qualification? tutor.qualification : '',
                                              city: tutor.city,
                                              achievement: tutor.achievement? tutor.achievement : '',
                                              gender: tutor.gender,
                                              age: tutor.age,
                                              experience: tutor.experience? tutor.experience : '',
                                              rate: tutor.hourly_rate_cents? tutor.hourly_rate_cents:0};
                  } else {
                    newTutor['/Location/' + cities[city].name + '/' +
                    subject.name + '/levels/'
                    + x + '/' + tutor.id] = null;
                  }
                }
              });

          } else {
            this.locationService.getCities(tutor.state)
              .subscribe(cities => {
                  for (let city in cities) {
                    newTutor['/Location/' + cities[city].name + '/' + subject.name + '/levels/' + x + '/' + tutor.id] = null;
                  }
              });
            }
          }
        }
      }

    // return this.db.object('/tutors/' + tutor.id).set(tutor);

    //clear up all cities in the state other than the ones selected

    //if there was a change of state then, clear up all other states then the one selected

    console.log("Updating tutor");
    tutor.previous_state = null;
    newTutor['/tutors/' + tutor.id] = tutor;
    return this.db.object('/').update(newTutor);


    //upload picture to storage

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
      //first time and when less < batch
      return this.db.list('/Location/' + city + '/' + subject + '/levels/' + level + '/', ref => ref.limitToFirst(batch)).snapshotChanges();
    }
  }

  bookTutor(bookingInfo) {
    // update bookTutor
    // update students/$student/booking
    // update students/$tutor/booking
    console.log(bookingInfo);
    // get push key
    console.log(bookingInfo);
    let newBooking = {};
    let tutorBooking = {};
    let studentBooking = {};

    let key = this.db.list('/tutorbooking/').push(newBooking).key;

    //admin
    newBooking['/tutorbooking/' + key] =
    {
      tutor: bookingInfo.tutor,
      subject: bookingInfo.class,
      student: bookingInfo.student,
      bookingTime: bookingInfo.bookingTime,
      booking_remark: bookingInfo.booking_remark,
      status: bookingInfo.status
    };

    //tutor
    newBooking['/tutors/' + bookingInfo.tutor.id + '/bookings/' + key] =
    {
      student: bookingInfo.student,
      class: bookingInfo.class,
      bookingTime: bookingInfo.bookingTime,
      booking_remark: bookingInfo.booking_remark,
      status: bookingInfo.status
    };

    //student
    newBooking['/students/' + bookingInfo.student.id + '/bookings/' + key] =
    {
      tutor: bookingInfo.tutor,
      class: bookingInfo.class,
      bookingTime: bookingInfo.bookingTime,
      booking_remark: bookingInfo.booking_remark,
      status: bookingInfo.status
    };

    return this.db.object('/').update(newBooking);

  }

  confirmClass(){

  }

  addStudent(student): any {
    return this.db.object('/students/' + student.id).set(student);
  }

  loadStudentBookings(student): any {
    return this.db.object('/students/' + student.id + '/bookings').valueChanges();
  }

  cancelStudentBooking(studentKey, bookingInfo): any {
    console.log(studentKey);
    console.log(bookingInfo);
    let updateBooking = {};
    updateBooking['/tutorbooking/' + bookingInfo.key] = null;
    updateBooking['/tutors/' + bookingInfo.tutorkey + '/bookings/' + bookingInfo.key + '/status'] = 'cancelled';
    updateBooking['/students/' + studentKey + '/bookings/' + bookingInfo.key] = null;
    return this.db.object('/').update(updateBooking);
  }

  loadTutorBookings(tutor): any {
    return this.db.object('/tutors/' + tutor.id + '/bookings').valueChanges();
  }

  tutorConfirmClass(tutorKey, bookingInfo, answer): any {
    console.log(bookingInfo);

    let updateBooking = {};
    updateBooking['/tutorbooking/' + bookingInfo.key + '/status'] = answer;
    updateBooking['/tutors/' + tutorKey + '/bookings/' + bookingInfo.key + '/status'] = answer;
    updateBooking['/students/' + bookingInfo.studentKey + '/bookings/' + bookingInfo.key + '/status'] = answer;
    return this.db.object('/').update(updateBooking);
  }

  tutorDeclineClass(bookingInfo): any {

  }

  getStudent(key): any {
    return this.db.object('students/' + key + '/').valueChanges();
  }

  createPayment(paymentInfo): any {
    //example on how to update firebase
    let newPayment = {};
    newPayment['/Student/class/payment'] = paymentInfo;
    newPayment['/Tutor/class/payment'] = paymentInfo;

    this.db.object('/').update(newPayment);
  }

  getStudentClasses(studentkey): any {
    return this.db.object('students/' + studentkey + '/bookings').valueChanges();
  }

  updateTutorPic(tutorKey, picurl) {
    let info = {};
    info['/tutors/' + tutorKey + '/picurl'] = picurl;
    return this.db.object('/').update(info);
  }

  updateStudentPic(studentKey, picurl) {
    let info = {};
    info['/students/' + studentKey + '/picurl'] = picurl;
    return this.db.object('/').update(info);
  }

  updateDipDeg(tutorKey,picurl) {
    let info = {};
    info['/tutors/' + tutorKey + '/file/dipdeg'] = picurl;
    return this.db.object('/').update(info);
  }

  loadAdminStudents() {
    return this.db.object('/students/').valueChanges();
  }

  loadAdminTutors() {
    return this.db.object('/tutors/').valueChanges();
  }

  loadAdminTutorBookings() {
    return this.db.object('/tutorbooking/').valueChanges();
  }

  loadTutorAccount(tutor): any {
    return this.db.list('/tutors/' + tutor.id + '/wallet/transactions').valueChanges();
  }

  loadTutorWallet(tutor): any {
    return this.db.object('/tutors/' + tutor.id + '/wallet').valueChanges();
  }

  loadTutorBalance(tutor): any {
    return this.db.object('/tutors/' + tutor.id + '/wallet/').valueChanges();
  }

  loadStudentAccount(student): any {
    return this.db.list('/students/' + student.id + '/wallet/transactions').valueChanges();
  }

  loadStudentBalance(student): any {
    return this.db.object('/students/' + student.id + '/wallet/').valueChanges();
  }

  getAdmin(adminKey) {
    console.log(adminKey);
  }

  addAdmin(admin) {
    return this.db.list('/admins/').push(admin);
  }

  checkAdmin(adminEmail) {
    return this.db.list('/admins/', ref => ref.orderByChild('email').equalTo(adminEmail)).snapshotChanges();
  }

  loadAdmins() {
    return this.db.list('/admins/').snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      });
  }

  deleteAdmin(key) {
    return this.db.object('/admins/' + key).set(null);
  }

  // loadTutorBookings() {
  //   return this.db.object('/tutors/').valueChanges();
  // }

  test(): any {
    return true;
  }
}
