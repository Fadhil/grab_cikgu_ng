import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Tutor } from '../../models/tutor';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';
import { distinctUntilKeyChanged } from 'rxjs/operator/distinctUntilKeyChanged';
import { TutorService } from '../../shared/services/tutor.service';
import { waitForMap } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-tutor-register',
  templateUrl: './tutor-register.component.html',
  styleUrls: ['./tutor-register.component.css']
})
export class TutorRegisterComponent implements OnInit {
  tutor = new Tutor();
  fbAuth: any;

  submitted = false;
  days = [];
  months = [];
  years = [];

  submit(): void {
    this.fbAuth.createUserWithEmailAndPassword(this.tutor.email, this.tutor.password)
    .then( firebaseUser => {
      this.router.navigate(['/tutor/login']);
      console.log ('User created with uid ' + firebaseUser.uid);
      this.alertService.success('Successfully registered as a Tutor.');
      this.tutor.id = firebaseUser.uid;
      delete this.tutor["cpass"];
      delete this.tutor["password"];

      //save to firebase
      this.firebaseService.addTutor(this.tutor);
    })
    .catch( error => {
      this.alertService.error(error);
      console.log(error);
    });
  }

  constructor(
    private alertService: AlertService,
    private tutorService: TutorService,
    private router: Router,
    public firebaseService: FirebaseService
  )
  {
    this.fbAuth = this.firebaseService.sfAuth.auth;
    this.tutor.gender="none";
    this.tutor.status="select";
    this.tutor.state="select";
    this.days = Array(31).fill(0).map((x,i)=>i+1);
    this.months = Array(12).fill(0).map((x,i)=>i+1);
    this.years = Array(100).fill(0).map((x,i)=>i+1);
  }

  ngOnInit() {
  }

}
