import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { Payment } from '../../../models/payment';

@Component({
  selector: 'app-student-pay-dialog',
  templateUrl: './student-pay-dialog.component.html',
  styleUrls: ['./student-pay-dialog.component.css']
})
export class StudentPayDialogComponent implements OnInit {

  payment: Payment;

  constructor(
    public dialogRef: MatDialogRef<StudentPayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.payment = new Payment();
    this.payment.type = "cr";
    this.payment.amount = this.data.balance;
    this.payment.remark = "Top Up";
  }

  topupButton() {
    console.log(this.payment);
    this.data.payment = this.payment;
    this.firebaseService.processPayment(this.data.key, this.payment, 'students');
    this.dialogRef.close("pay");
  }

}
