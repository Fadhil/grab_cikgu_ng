import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Tutor } from '../../models/tutor';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';
import { distinctUntilKeyChanged } from 'rxjs/operator/distinctUntilKeyChanged';

@Component({
  selector: 'app-tutor-register',
  templateUrl: './tutor-register.component.html',
  styleUrls: ['./tutor-register.component.css']
})
export class TutorRegisterComponent implements OnInit {
  tutor = new Tutor();

  submitted = false;

  submit() { 
    // post input to api 
    // get Response
    //   if response is user object
    //    save user object into local disk 
    //   else this.alertService.error("Unable to register. Errors:" ++ response.error);
    this.submitted = true; console.log('submitted'); 
  }

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

}
