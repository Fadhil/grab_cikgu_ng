import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { LocationService } from '../../shared/services/location.service';
import { Router } from '@angular/router';
import { State } from '../../models/state';
import { City } from '../../models/city';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Tutor } from './../../models/tutor';
import { Subject, Subjects, Levels } from './../../models/subject';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {ViewEncapsulation} from '@angular/core';
import { Student } from './../../models/student';

import * as _ from 'lodash';

declare var $: any;

@Component({
  selector: 'app-student-people',
  templateUrl: './student-people.component.html',
  styleUrls: ['./student-people.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StudentPeopleComponent implements OnInit {
  states: State[] = [];
  cities: City[] = [];
  state: string;
  city: string;
  matapelajaran: any;
  subject: any;
  levels: any;
  rate: string;
  level: number;

  public startAt = new Date(2019, 2, 15, 20, 30);

  tutors: any;
  selectedTutor: Tutor;
  // selectedDateTime: Date();
  // selectedTime: any;

  public modalref: any;
  closeResult: string;

  tutorsList = new BehaviorSubject([]);

  batch = 5;         // size of each query
  lastKey = '';      // key to offset next query from
  finished = false;  // boolean when end of database is reached

  student_observable: any;
  studentProfile = new Student();

  booking_date: any;
  booking_time: any;

  avatar: string;

  constructor(
    private alertService: AlertService,
    private locationService: LocationService,
    private router: Router,
    public firebaseService: FirebaseService,
    private modalService: NgbModal
    ) {
        this.matapelajaran = Subjects;
        this.levels = Levels;
      }

  ngOnInit() {
    this.locationService.getStates()
    .subscribe(results => {
      this.states = results;
    });

    this.state = 'Selangor';
    this.onStateChange(this.state);
    this.city = 'Cyberjaya';
    this.rate = 'select';
    this.level = 0;
    this.onLevelChange(this.level);
    this.subject = 'select';
    this.selectedTutor = new Tutor();

    this.student_observable = this.firebaseService.getStudent(localStorage.getItem('currentUserToken'))
      .subscribe(data => {
        this.studentProfile = data;
        this.avatar = 'assets/img/avatar5.png';
      });
  }

  myFilter = (d: Date): boolean => {
      const day = d.getDay();
      // Prevent Saturday and Sunday from being selected.
      // return day !== 0 && day !== 6;
      return true;
  }

  onStateChange(state) {
    console.log("State change" + state);
    this.city = 'select';
    this.locationService.getCities(state)
      .subscribe(result => {
        console.log(result);
        this.cities = result;
      }, error => {
         this.alertService.error('Failed to find cities for ' + state);
      });
  }

  onLevelChange(level) {
    this.matapelajaran = _.filter(Subjects, function(o){
      return o.levels[level];
    });
    this.subject = 'select';
  }

  searchTutor() {
    const s = this.subject;
    const l = this.level;

    this.firebaseService.searchTutor(this.city, this.level, this.subject)
      .subscribe(tutors => {
        this.tutors = _.filter(tutors, function(o){
          const p = o['subjects'];
          if (p) {
            if (p[s].levels[l]) {
              return true;
            }
          }
        });

        if (this.tutors.length > 0) {
          this.alertService.success("Found " + this.tutors.length + " match");
        }
      });
  }

  searchNewTutorBatch(){
    this.finished = false;
    this.tutorsList = new BehaviorSubject([]);
    this.lastKey = '';
    this.searchTutorBatch();
  }

  searchTutorBatch() {
    console.log("SearchTutorBatch");
    // this.tutorsList = [];
    // this.tutorsList = new BehaviorSubject([]);

    if (this.finished) return;

    console.log("finished == false");

    const s = this.subject;
    const l = this.level;

    this.firebaseService
      .searchTutorBatch(this.city, this.subject, this.level, this.batch + 1, this.lastKey)
      .map( actions => {
        return actions.map(action => ({key: action.key, ...action.payload.val()}));
      })
      .subscribe(tutors => {
        this.lastKey = _.last(tutors).key;

        const newTutors = _.slice(tutors, 0, this.batch);

        let currentTutors = tutors;

        if (this.lastKey === _.last(newTutors).key) {
          this.finished = true;
        }
        this.tutorsList.next( _.concat(this.tutorsList.getValue(), newTutors));

        currentTutors = this.tutorsList.getValue();

        if (currentTutors.length > 0) {
          this.alertService.success("Found " + currentTutors.length + " match");
        }

      });
  }


  onScroll () {
      this.searchTutorBatch();
  }

  bookTutor(tutor) {

    console.log(tutor);

    const classInfo = {name: this.subject, level: this.level};
    const bookingTime = {date: this.booking_date, time: this.booking_time};

    const bookingInfo = {tutor: tutor, student: this.studentProfile, class: classInfo, bookingTime: bookingTime, status: 'pending'};
    console.log(bookingInfo);

    this.firebaseService.bookTutor(bookingInfo)
      .then(result => {
        this.close(); // close modal
        this.router.navigateByUrl('/student/class');
        this.alertService.success('Successfully Booked Class');
      });

  }

  open2(content) {
    this.modalref = this.modalService.open(content);
    this.modalref.result.then((result) => {
        console.log("closed");
        console.log(result);
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        console.log(reason);
        console.log("dismissed");
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  closeModal(){
    this.modalref.close('closed');
  }

  open(tutor){
    console.log(tutor);
    this.selectedTutor = tutor;
    // $('#datetimepicker3').datetimepicker({
    //     format: 'LT'
    // });

    $("#modal-default").modal('show');
  }

  close(){
    $("#modal-default").modal('hide');
  }

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }
}
