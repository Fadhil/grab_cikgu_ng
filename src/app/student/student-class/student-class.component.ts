import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../../shared/services/firebase.service';
import { AlertService } from './../../shared/services/alert.service';
import { Router } from '@angular/router';
import { Student } from './../../models/student';
import * as _ from 'lodash';

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.css']
})
export class StudentClassComponent implements OnInit {
  displayedColumns = ['date', 'time', 'name', 'tutor', 'status'];
  myDataSource = new MatTableDataSource();
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  student_observable: any;
  studentProfile = new Student();
  JSON: any;

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
              returnArr.push({ date: da[item].bookingTime.date, time: da[item].bookingTime.time, name: da[item].class.name, tutor: da[item].tutor.name, status: da[item].status  });
              i++;
            }

            this.myDataSource.data = _.reverse(returnArr);
          });
      });


  }

  sortData(event){
    console.log(event);
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

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
