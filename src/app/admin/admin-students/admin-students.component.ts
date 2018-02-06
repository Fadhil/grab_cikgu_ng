import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Router } from '@angular/router';
import { Student } from './../../models/student';
import { Tutor } from '../../models/tutor';
import { Subject, Subjects, Levels } from './../../models/subject';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as _ from 'lodash';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {
  displayedColumns = ['name', 'email', 'phone', 'actions'];
  myDataSource = new MatTableDataSource();
  students_observable: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private router: Router,
    public firebaseService: FirebaseService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.students_observable = this.firebaseService.loadAdminStudents()
      .subscribe(data => {
        console.log(data);

        var returnArr = [];
        for(let item in data) {
          returnArr.push({key: item,
                          name: data[item].name,
                          phone: data[item].phone_no,
                          email: data[item].email});
        }

        this.myDataSource.data = _.reverse(returnArr);
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

  deleteStudent(key) {
    console.log(key);
  }

  openDialog(element){
    console.log(element);
    let dialogRef = this.dialog.open(StudentDialog, {
      width: '500px',
      data: element
    });
  }

}

@Component({
  selector: 'student-dialog',
  templateUrl: 'student-dialog.component.html',
  styleUrls: ['student-dialog.component.css']
})
export class StudentDialog {

  constructor(
    public dialogRef: MatDialogRef<StudentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
      console.log(this.data);
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    submit() {
      // console.log(this.data.email);
      // this.data.email = "dsadsa.com"
      this.dialogRef.close();
    }

}
