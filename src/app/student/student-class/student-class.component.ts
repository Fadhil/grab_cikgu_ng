import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../../shared/services/firebase.service';
import { AlertService } from './../../shared/services/alert.service';
import { Router } from '@angular/router';
import { Student } from './../../models/student';
import { Subject, Subjects, Levels } from './../../models/subject';
import * as _ from 'lodash';

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.css']
})
export class StudentClassComponent implements OnInit {
  displayedColumns = ['date', 'time', 'duration', 'name', 'tutor', 'status'];
  myDataSource = new MatTableDataSource();
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  student_observable: any;
  studentProfile = new Student();
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

    this.student_observable = this.firebaseService.getStudent(localStorage.getItem('currentUserToken'))
      .subscribe(data => {
        console.log(data);
        this.studentProfile = data;
        this.avatar = 'assets/img/avatar5.png';
        this.firebaseService.getStudentClasses(this.studentProfile.id)
          .subscribe(da => {
            console.log(da);

            let d = new Date();

            var returnArr = [];

            let i = 0 ;
            for (let item in da) {
              if (item) {
                returnArr.push({  key: item,
                                  date: da[item].bookingTime.date,
                                  time: da[item].bookingTime.time,
                                  duration: da[item].bookingTime.duration,
                                  name: da[item].class.name,
                                  level: Levels[da[item].class.level],
                                  tutorkey: da[item].tutor.key,
                                  tutor: da[item].tutor.name,
                                  status: da[item].status});
                i++;
              }
            }

            this.myDataSource.data = _.reverse(returnArr);
          });
      });


  }

  sortData(event) {
    console.log(event);
  }

  deleteBooking(bookingInfo) {
    if (confirm("Are you sure?")) {
      this.firebaseService.cancelStudentBooking(this.studentProfile.id, bookingInfo);
    }
  }

  statusLabel(status) {
    switch (status) {
      case 'pending':
        return 'label-danger';
      case 'confirmed':
        return 'label-success';
      case 'declined':
        return 'label-warning';
      case 'completed':
        return 'label-primary';
      default:
        return 'label-default';
    }

  }

  ngAfterViewInit() {
    this.myDataSource.sort = this.sort;
    this.myDataSource.paginator = this.paginator;

  }

}

export interface Element {
  date: Date;
  name: string;
  tutor: string;
  status: string;
}

export interface Element2 {
  tarikh: Date;
  name: string;
  tutor: string;
  status: string;
}
