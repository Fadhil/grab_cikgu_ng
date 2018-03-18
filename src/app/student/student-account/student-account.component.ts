import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../../shared/services/firebase.service';
import { AlertService } from './../../shared/services/alert.service';
import { Router } from '@angular/router';
import { Student } from './../../models/student';
import { Tutor } from '../../models/tutor';
import { Subject, Subjects, Levels } from './../../models/subject';
import * as _ from 'lodash';

@Component({
  selector: 'app-student-account',
  templateUrl: './student-account.component.html',
  styleUrls: ['./student-account.component.css']
})
export class StudentAccountComponent implements OnInit {

  displayedColumns = ['date', 'type', 'amount', 'remark'];
  myDataSource = new MatTableDataSource();

  student_observable: any;
  studentProfile = new Student();
  JSON: any;
  avatar: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private router: Router,
    public firebaseService: FirebaseService
  ) {
  this.JSON = JSON;
    }

  ngOnInit() {
    this.student_observable = this.firebaseService.getStudent(localStorage.getItem('currentUserToken'))
      .subscribe(data => {
        console.log(data);
        this.studentProfile = data;
        console.log(this.studentProfile.id);
        this.avatar = 'assets/img/avatar5.png';

        this.firebaseService.loadStudentAccount(this.studentProfile)
          .subscribe(da => {
            console.log(da);

            let d = new Date();

            var returnArr = [];

            let i = 0 ;
            for (let item in da) {
              if (item) {
                returnArr.push({key: item,
                                date: da[item].date,
                                type: da[item].type,
                                remark: da[item].remark,
                                amount: da[item].amount,
                                credit_hour: da[item].credit_hour
                                });
                i++;
            }
          }

              this.myDataSource.data = _.reverse(returnArr);
          });

          this.firebaseService.loadStudentBalance(this.studentProfile)
             .subscribe(dataa => {
              this.studentProfile = dataa;
               console.log(dataa);
             });
      });
  }

  ngAfterViewInit() {
    this.myDataSource.sort = this.sort;
    this.myDataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.myDataSource.filter = filterValue;
  }

}
