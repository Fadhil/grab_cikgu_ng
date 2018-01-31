import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Tutor } from '../../models/tutor';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';
import { distinctUntilKeyChanged } from 'rxjs/operator/distinctUntilKeyChanged';
import { TutorService } from '../../shared/services/tutor.service';
import { waitForMap } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';
import { LocationService } from '../../shared/services/location.service';
import { State } from '../../models/state';
import { City } from '../../models/city';


@Component({
  selector: 'app-tutor-register',
  templateUrl: './tutor-register.component.html',
  styleUrls: ['./tutor-register.component.css']
})
export class TutorRegisterComponent implements OnInit {
  states: State[] = [];
  cities: City[] = [];

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

      // remove fields to not be included into firebase
      delete this.tutor['cpass'];
      delete this.tutor['password'];

      this.tutor.dob = new Date(this.tutor.bmonth + '/' + this.tutor.bday + '/' + this.tutor.byear);


      const currentDate = new Date();
      this.tutor.age = this.tutor.byear - currentDate.getFullYear();

      // save to firebase
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
    public firebaseService: FirebaseService,
    private locationService: LocationService
  )
  {
    this.fbAuth = this.firebaseService.sfAuth.auth;
    this.tutor.gender = 'none';
    this.tutor.status = 'select';
    this.tutor.state = 'select';
    this.days = Array(31).fill(0).map((x, i) => i + 1);
    this.months = Array(12).fill(0).map((x, i) => i + 1);
    this.years = Array(100).fill(0).map((x, i) => i + 1);
  }

  ngOnInit() {
    this.locationService.getStates()
    .subscribe(results => {
      this.states = results;
    });
  }

  onStateChange(state) {
    this.locationService.getCities(state)
      .subscribe(result => {
        this.cities = result;
        this.tutor.city = '';
      }, error => {
         this.alertService.error('Failed to find cities for ' + state);
      });
  }


}
