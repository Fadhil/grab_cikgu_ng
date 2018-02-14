import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../../shared/services/firebase.service';
import { AlertService } from './../../shared/services/alert.service';
import { Router } from '@angular/router';
import { Student } from './../../models/student';
import { Tutor } from '../../models/tutor';
import { Subject, Subjects, Levels } from './../../models/subject';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit {

  displayedColumns = ['tutor', 'student', 'status', 'view', 'action'];
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
    public dialog: MatDialog,
  ) {
    this.JSON = JSON;
  }

  ngOnInit() {
    this.tutor_observable = this.firebaseService.loadAdminTutorBookings()
      .subscribe(data => {
        console.log(data);

        var returnArr = [];
        for (let item in data) {
          returnArr.push({key: item,
                          tutor: data[item].tutor.name,
                          student: data[item].student.name,
                          status: data[item].status,
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
    let dialogRef = this.dialog.open(BookingDialog, {
      width: '500px',
      data: element
    });
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

  confirmClass(bookingInfo) {
    let a = this.firebaseService.tutorConfirmClass(this.tutorProfile.id, bookingInfo, 'confirmed');
    console.log(a);
  }

  declineClass(bookingInfo) {
    let a = this.firebaseService.tutorConfirmClass(this.tutorProfile.id, bookingInfo, 'declined');
    console.log(a);
  }

  completeClass(bookingInfo) {
    let a = this.firebaseService.tutorConfirmClass(this.tutorProfile.id, bookingInfo, 'completed');
  }

}

  @Component({
    selector: 'booking-dialog',
    templateUrl: 'booking-dialog.component.html',
    styleUrls: ['booking-dialog.component.css']
  })
  export class BookingDialog {

    constructor(
      public dialogRef: MatDialogRef<BookingDialog>,
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
