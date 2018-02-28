import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AlertService } from './../../shared/services/alert.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  admin = new Admin();
  email: string;
  code: string;
  showSpinner: boolean = true;
  fbAuth: any;
  submitted: boolean = false;

  constructor(private alertService: AlertService,
              private firebaseService: FirebaseService,
              private router: Router
  ) {
      const snapshot: RouterStateSnapshot = router.routerState.snapshot;
      console.log(snapshot);  // <-- hope it helps
      const root: ActivatedRouteSnapshot = snapshot.root;
      const child = root.firstChild;
      console.log(child.queryParams.email);
      console.log(child.queryParams.code);
      this.email = child.queryParams.email;
      this.code = child.queryParams.code;

      this.fbAuth = this.firebaseService.sfAuth.auth;

      // Load Admin code
      let s = firebaseService.loadAdminByCode(this.code)
                              .subscribe(res => {
                                console.log(res);
                                this.showSpinner = false;
                                this.admin.email = res as string;
                                // if (res.length > 0) {
                                //   console.log(res.length);
                                // } else {
                                //   console.log("Invalid request");
                                // }
                              });

    }

  ngOnInit() {
  }

  submit(): void {
    console.log("Form Submitted");
    this.submitted = true;
    this.fbAuth.createUserWithEmailAndPassword(this.admin.email, this.admin.password)
      .then( firebaseUser => {
        this.router.navigate(['/admin/login']);
        this.alertService.success('Successfully registered as an Admin.');
      })
      .catch( error => {
        this.router.navigate(['/admin/login']);
        this.alertService.success('Successfully registered as an Admin.');

        // this.alertService.error(error);
        // console.log(error);
        // this.submitted = false;
      });
  }

}
