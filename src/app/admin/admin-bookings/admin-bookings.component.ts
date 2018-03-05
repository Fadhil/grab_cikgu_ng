import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../../shared/services/firebase.service';
import { MailService } from '../../shared/services/mail.service';
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

  displayedColumns = ['tutor', 'student', 'class', 'session', 'status', 'view', 'action'];
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
    public mailService: MailService,
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
                          tutorName: data[item].tutor ? data[item].tutor.name : null,
                          tutorPhone: data[item].tutor ? data[item].tutor.phone_no : null,
                          tutorEmail: data[item].tutor ? data[item].tutor.email : null,
                          tutorOccupation: data[item].tutor ? data[item].tutor.occupation : null,
                          tutorLicense: data[item].tutor ? data[item].tutor.tutor_license_no : null,
                          tutorStatus: data[item].tutor ? data[item].tutor.status : null,

                          studentName: data[item].student ? data[item].student.name : null,
                          studentGrade: data[item].student ? data[item].student.occupation : null,
                          studentAge: data[item].student ? data[item].student.age : null,
                          studentPhone: data[item].student ? data[item].student.phone_no : null,
                          studentEmail: data[item].student ? data[item].student.email : null,
                          studentAddress: data[item].student ? data[item].student.address : null,
                          studentCity: data[item].student ? data[item].student.city : null,

                          subject: data[item].subject ? data[item].subject.name : null, //class
                          level: data[item].subject ? Levels[data[item].subject.level] : null, //class
                          bookingDate: data[item].bookingTime ? data[item].bookingTime.date : null, //session
                          bookingTime: data[item].bookingTime ? data[item].bookingTime.time : null, //session
                          bookingRemark: data[item].booking_remark,
                          status: data[item].status
                          });
                        }
          this.myDataSource.data = _.reverse(returnArr);
        });
  }

  myFilter = (d: Date): boolean => {
      const day = d.getDay();
      // Prevent Saturday and Sunday from being selected.
      // return day !== 0 && day !== 6;
      return true;
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
    this.mailService.mailAcceptedNotif(bookingInfo.smail)
      .subscribe(res => {
        console.log("Triggered");
        console.log(res);
      });
    this.mailService.mailTAcceptedNotif(bookingInfo.tmail)
      .subscribe(res => {
        console.log("Triggered");
        console.log(res);
      });
    console.log(a);
  }

  declineClass(bookingInfo) {
    let a = this.firebaseService.tutorConfirmClass(this.tutorProfile.id, bookingInfo, 'declined');
    this.mailService.mailDeclinedNotif(bookingInfo.smail)
      .subscribe(res => {
        console.log("Triggered");
        console.log(res);
      });
    this.mailService.mailTDeclinedNotif(bookingInfo.tmail)
      .subscribe(res => {
        console.log("Triggered");
        console.log(res);
      });
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

    tutor_observable: any;
    tutorProfile = new Tutor();

    constructor(
      public firebaseService: FirebaseService,
      private alertService: AlertService,
      private router: Router,
      public dialogRef: MatDialogRef<BookingDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

      ngOnInit() {
          console.log(this.data);
      }

      updateClass(bookingInfo, element) {
        let c = this.firebaseService.adminAddClass(bookingInfo, element.bookingDate);
        console.log(c);
        // this.tutorProfile.subjects = null;
        // this.tutorProfile.subjects = this.subjects;
        // console.log(this.subjects);
        // let c = this.firebaseService.addClass(this.data)
        //   .then(result => {
        //     this.router.navigateByUrl('/admin/booking');
        //     this.alertService.success('Successfully Added Class');
        //   })
        //   .catch(error => {
        //     // this.router.navigateByUrl('/tutor/profile');
        //     this.alertService.error(error);
        //   });



      }

      cancelClass(bookingInfo){
        let c = this.firebaseService.adminCancelClass(bookingInfo);
        console.log(c);
      }

      confirmClass(bookingInfo) {
        let a = this.firebaseService.tutorConfirmClass(this.tutorProfile.id, bookingInfo, 'confirmed');
        console.log(a);
      }

      declineClass(bookingInfo) {
        let a = this.firebaseService.tutorConfirmClass(this.tutorProfile.id, bookingInfo, 'declined');
        console.log(a);
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
