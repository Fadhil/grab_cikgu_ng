import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    let da = {name: 'Hazim', animal: 'Kucing'};
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: da;
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log('Save the data');
      }
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <h1 mat-dialog-title>hello</h1>
  <mat-dialog-content>
  Isi Kandungan dialog
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close (click)="onNoClick()">No</button>
    <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
    <button mat-button [mat-dialog-close]="true">Yes</button>
  </mat-dialog-actions>
  `,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
      console.log(this.data);
    }

    onNoClick(): void {
      this.data.animal = "Kambing";
      this.dialogRef.close();
    }

}
