import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AlertService } from './../../shared/services/alert.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

// import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  displayedColumns = ['email', 'actions'];
  myDataSource = new MatTableDataSource();
  admins_observable: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private alertService: AlertService, public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.admins_observable = this.firebaseService.loadAdmins().subscribe(admins => {
      var returnArr = [];
      for(let admin in admins) {
        returnArr.push(admins[admin]);
      }
      this.myDataSource.data = returnArr;
    });
  }

  deleteAdmin(adminKey) {
    if (confirm("Delete: Are you sure? ")) {
      return this.firebaseService.deleteAdmin(adminKey);
    }
  }

  openDialog() {
    let da = {email: ''};
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: da
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(da);
        let res = this.firebaseService.checkAdmin(da.email)
                    .subscribe(result => {
                        console.log(result);
                        res.unsubscribe();
                        if (!result.length) {
                          this.firebaseService.addAdmin(da)
                            .then(result => {
                              console.log(result);
                            });
                          // .then(
                          //   console.log("Successfully added admin");
                          //   // TODO: Send email to the admin and provide link to register.
                          // );
                        } else {
                          console.log("The user has already been registered");
                        }
                    });
      }
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.component.html',
  styleUrls: ['dialog-overview-example-dialog.component.css']
})
export class DialogOverviewExampleDialog {

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);
  //
  // matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
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
