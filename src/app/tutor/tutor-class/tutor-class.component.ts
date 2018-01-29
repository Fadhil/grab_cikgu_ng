import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../../shared/services/firebase.service';
import { AlertService } from './../../shared/services/alert.service';
import { Router } from '@angular/router';
import { Student } from './../../models/student';
import { Tutor } from '../../models/tutor';
import { Subject, Subjects, Levels } from './../../models/subject';
import * as _ from 'lodash';

@Component({
  selector: 'app-tutor-class',
  templateUrl: './tutor-class.component.html',
  styleUrls: ['./tutor-class.component.css']
})
export class TutorClassComponent implements OnInit {

  displayedColumns = ['date', 'time', 'duration', 'name', 'tutor', 'status', 'action'];
  myDataSource = new MatTableDataSource();

  tutor_observable: any;
  tutorProfile = new Tutor();
  JSON: any;
  avatar: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private alertService: AlertService,
    private router: Router,
    public firebaseService: FirebaseService,
  ) {
    this.JSON = JSON;
  }

  ngOnInit() {
    this.tutor_observable = this.firebaseService.getTutor(localStorage.getItem('currentUserToken'))
      .subscribe(data => {
        console.log(data);
        this.tutorProfile = data;
        console.log(this.tutorProfile.id);
        this.avatar = 'assets/img/avatar5.png';
        this.firebaseService.loadTutorBookings(this.tutorProfile)
          .subscribe(da => {
            console.log(da);

            let d = new Date();

            var returnArr = [];

            let i = 0 ;
            for (let item in da) {
              if (item) {
                returnArr.push({  key: item,
                                  date: da[item].bookingTime ? da[item].bookingTime.date : null,
                                  time: da[item].bookingTime ? da[item].bookingTime.time : null,
                                  duration: da[item].bookingTime ? da[item].bookingTime.duration : null,
                                  name: da[item].class ? da[item].class.name : null,
                                  level: da[item].class ? Levels[da[item].class.level] : null,
                                  student: da[item].student ? da[item].student.name : null,
                                  status: da[item].status});
                i++;
              }
            }

            this.myDataSource.data = _.reverse(returnArr);
          });
      });
  }

  statusLabel(status) {
    switch (status) {
      case 'pending':
        return 'label-danger';
        break;
      case 'confirmed':
        return 'label-success';
        break;
        case 'completed':
          return 'label-primary';
          break;
      default:
        return 'label-default';
    }

  }

  confirmClass(bookingKey) {

  }

  declineClass(bookingKey) {

  }

}
