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
  selector: 'app-tutor-account',
  templateUrl: './tutor-account.component.html',
  styleUrls: ['./tutor-account.component.css']
})
export class TutorAccountComponent implements OnInit {

  displayedColumns = ['date', 'type', 'amount', 'remark'];
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
    public firebaseService: FirebaseService
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

        this.firebaseService.loadTutorAccount(this.tutorProfile)
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
                                // balance: da[item].balance,
                                amount: da[item].amount
                                });
                i++;
            }
          }

              this.myDataSource.data = _.reverse(returnArr);
          });

          this.firebaseService.loadTutorBalance(this.tutorProfile)
             .subscribe(dataa => {
              this.tutorProfile = dataa;
               console.log(dataa);
             });

         this.firebaseService.loadTutorWallet(this.tutorProfile)
          .subscribe(d => {
            console.log(d);
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
