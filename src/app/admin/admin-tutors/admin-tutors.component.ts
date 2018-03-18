import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../../shared/services/firebase.service';
import { AlertService } from './../../shared/services/alert.service';
import { Router } from '@angular/router';
import { Tutor } from './../../models/tutor';
import { Subject, Subjects, Levels } from './../../models/subject';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TutorPayDialogComponent } from './tutor-pay-dialog/tutor-pay-dialog.component';
import { MailService } from '../../shared/services/mail.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-admin-tutors',
  templateUrl: './admin-tutors.component.html',
  styleUrls: ['./admin-tutors.component.css']
})
export class AdminTutorsComponent implements OnInit {

  displayedColumns = ['name', 'email', 'phone_no', 'balance', 'actions'];
  myDataSource = new MatTableDataSource();
  tutor_observable: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private router: Router,
    public firebaseService: FirebaseService,
    public dialog: MatDialog,
    public mailService: MailService
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
                          city: data[item].city,
                          balance: data[item].wallet ? data[item].wallet.balance : 0,
                          // transactions: data[item].wallet ? data[item].wallet.transactions: null,
                         });
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

  payTutor(element) {
    let dialogRef = this.dialog.open(TutorPayDialogComponent, {
      width: '500',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'pay'){
        this.mailService.mailNotifyTutorPayment(element.email, element.payment)
          .subscribe( res => {
            console.log("Notified tutor on payment")
          })
        console.log(element.payment);
      }
    });
  }

  openDialog(element){
    console.log(element.transactions);
    // element.transactions = JSON.parse(element.transactions);

    element.transactions = this.firebaseService.getTutorWalletTransactions(element.key);

    let dialogRef = this.dialog.open(TutorDialog, {
      width: '500px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'topup') {
        const topupData = {
          amount: 50,
          remark: 'test'
        };
        console.log(element.key)
        this.firebaseService.topupTutor(element.key, topupData);
      }
    });

  }

}

@Component({
  selector: 'tutor-dialog',
  templateUrl: 'tutor-dialog.component.html',
  styleUrls: ['tutor-dialog.component.css']
})
export class TutorDialog {

  transactions: any;

  constructor(
    public dialogRef: MatDialogRef<TutorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        console.log(this.data);
        this.data.transactions.subscribe(d => {
          console.log(d);
          this.transactions = d;
        });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    topup(): void {
      // topup tutor wallet
      // done
      this.dialogRef.close("topup");
    }

    submit() {
      // console.log(this.data.email);
      // this.data.email = "dsadsa.com"
      this.dialogRef.close();
    }

}
