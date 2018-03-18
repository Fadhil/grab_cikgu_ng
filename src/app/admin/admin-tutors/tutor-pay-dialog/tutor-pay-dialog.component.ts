import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { Payment } from '../../../models/payment';

@Component({
  selector: 'app-tutor-pay-dialog',
  templateUrl: './tutor-pay-dialog.component.html',
  styleUrls: ['./tutor-pay-dialog.component.css']
})
export class TutorPayDialogComponent {

  payment: Payment;

  constructor(
    public dialogRef: MatDialogRef<TutorPayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public firebaseService: FirebaseService
    ) { }

  ngOnInit() {
    console.log(this.data);
    this.payment = new Payment();
    this.payment.type = "dr";
    this.payment.amount = this.data.balance;
    this.payment.remark = "Payment from TutorGo";
  }

  payButton() {
    console.log(this.payment);
    this.firebaseService.processPayment(this.data.key, this.payment);
    this.data.payment = this.payment;
    this.dialogRef.close("pay");

  }

}
