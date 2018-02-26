import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AlertService } from './../../shared/services/alert.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ConfigService } from '../../shared/services/config.service';
import { MailService } from '../../shared/services/mail.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Response, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
  config: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private alertService: AlertService,
    public firebaseService: FirebaseService,
    private http: HttpClient,
    private configService: ConfigService,
    private mailService: MailService) { }

  handleError(d,y) {
    console.log(d,y);
  }

  ngOnInit() {
    this.admins_observable = this.firebaseService.loadAdmins().subscribe(admins => {
      var returnArr = [];
      for(let admin in admins) {
        returnArr.push(admins[admin]);
      }
      this.myDataSource.data = returnArr;

      this.showConfig();
    })

  }

  deleteAdmin(adminKey) {
    if (confirm("Delete: Are you sure? ")) {
      return this.firebaseService.deleteAdmin(adminKey);
    }
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe(data => {
        this.config = {
          sendmailUrl: data['sendmailUrl']
        }
        console.log(this.config.sendmailUrl);
      });
  }

  openDialog() {

    let url = `https://us-central1-grabcikgu.cloudfunctions.net/api/sendMail`;
    let params: URLSearchParams = new URLSearchParams();
    // let headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

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
                              this.mailService.mailAdminRegister(da.email)
                                .subscribe(res => {
                                  console.log(res);
                                })
                            });
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
      this.dialogRef.close();
    }

}
