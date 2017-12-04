import { Router } from '@angular/router';
import { Tutor } from './../../models/tutor';
import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { TutorService } from '../../shared/services/tutor.service';

@Component({
  selector: 'app-tutor-profile-edit',
  templateUrl: './tutor-profile-edit.component.html',
  styleUrls: ['./tutor-profile-edit.component.css']
})
export class TutorProfileEditComponent implements OnInit {
  tutorProfile = new Tutor();

  constructor(private tutorService: TutorService,
  private alertService: AlertService,
  private router: Router
  ) {
  }

  ngOnInit() {
    console.log('initializing Tutor Service');
    this.tutorService.getTutorProfile()
    .subscribe(result => {
      this.tutorProfile = result;
      console.log("got profile", this.tutorProfile);
    });
  }

  display_change(newValue) {
    console.log(newValue);
  }

  saveProfile() {
    console.log("saving profile with attrs:", this.tutorProfile);
    this.router.navigateByUrl('/tutor/profile');
  }
}
