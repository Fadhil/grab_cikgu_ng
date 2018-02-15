import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../../shared/services/firebase.service';
import { AlertService } from './../../shared/services/alert.service';
import { Router } from '@angular/router';
import { Tutor } from './../../models/tutor';
import { Subject, Subjects, Levels } from './../../models/subject';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';


@Component({
  selector: 'app-admin-tutors',
  templateUrl: './admin-tutors.component.html',
  styleUrls: ['./admin-tutors.component.css']
})
export class AdminTutorsComponent implements OnInit {
  
  displayedColumns = ['name', 'email', 'phone_no', 'actions'];
  myDataSource = new MatTableDataSource();
  tutor_observable: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private router: Router,
    public firebaseService: FirebaseService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.tutor_observable = this.firebaseService.loadAdminTutors()
      .subscribe(data => {
        console.log(data);

        var returnArr = [];
        for (let item in data) {
          returnArr.push({key: item,
                          name: data[item].name,
                          email: data[item].email,
                          phone_no: data[item].phone_no,
                          city: data[item].city});
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

  deleteTutor(key){
  console.log(key);
  }

  openDialog(element){
    console.log(element);
    let dialogRef = this.dialog.open(TutorDialog, {
      width: '500px',
      data: element
    });
  }

}

@Component({
  selector: 'tutor-dialog',
  templateUrl: 'tutor-dialog.component.html',
  styleUrls: ['tutor-dialog.component.css']
})
export class TutorDialog {

  constructor(
    public dialogRef: MatDialogRef<TutorDialog>,
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
