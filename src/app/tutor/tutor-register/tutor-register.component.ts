import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Tutor } from '../../models/tutor';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';
import { distinctUntilKeyChanged } from 'rxjs/operator/distinctUntilKeyChanged';
import { TutorService } from '../../shared/services/tutor.service';

@Component({
  selector: 'app-tutor-register',
  templateUrl: './tutor-register.component.html',
  styleUrls: ['./tutor-register.component.css']
})
export class TutorRegisterComponent implements OnInit {
  tutor = new Tutor();

  submitted = false;

  submit(): void {
    // post input to api
    // get Response
    //   if response is user object
    //    save user object into local disk
    //   else this.alertService.error("Unable to register. Errors:" ++ response.error);
    console.log("submit clicked. Registering tutor");
    this.tutorService.createTutor(this.tutor)
      .subscribe(tutor => this.tutor = tutor);
  }


  constructor(
    private alertService: AlertService,
    private tutorService: TutorService
  ) { }

  ngOnInit() {
  }

}
