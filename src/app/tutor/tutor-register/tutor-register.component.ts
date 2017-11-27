import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Tutor } from '../../models/tutor';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';
import { distinctUntilKeyChanged } from 'rxjs/operator/distinctUntilKeyChanged';
import { TutorService } from '../../shared/services/tutor.service';
import { waitForMap } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-register',
  templateUrl: './tutor-register.component.html',
  styleUrls: ['./tutor-register.component.css']
})
export class TutorRegisterComponent implements OnInit {
  tutor = new Tutor();

  submitted = false;

  submit(): void {
    console.log("submit clicked. Registering tutor");
    this.tutorService.createTutor(this.tutor)
      .subscribe(
        result => {
          this.router.navigate(['/tutor/login']);
          this.alertService.success("Successfully registered as a Tutor. ");
          this.tutor = result;
        },
        error => {
          console.log("got an error", error);
          this.alertService.error(error);
        }
      );
  }


  constructor(
    private alertService: AlertService,
    private tutorService: TutorService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
