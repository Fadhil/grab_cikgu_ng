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
  hourlyRate = 0;
  constructor(private tutorService: TutorService,
  private alertService: AlertService,
  private router: Router
  ) {
  }

  ngOnInit() {
    // Hides tooltip when switching between save/edit
    $('.tooltip').hide();
    this.tutorService.getTutorProfile()
    .subscribe(result => {
      this.tutorProfile = result;
    });
  }

  display_change(newValue) {
    console.log(newValue);
  }

  saveProfile() {
    this.tutorProfile.hourly_rate_cents = (this.hourlyRate * 100);
    console.log('saving profile with attrs:', this.tutorProfile);
    this.tutorService.updateTutorProfile(this.tutorProfile)
      .subscribe(result => {

        this.router.navigateByUrl('/tutor/profile');
        this.alertService.success('Successfully Updated Profile');
      },
      error => {
        console.log('Failed to update profile:', error);
        this.alertService.error('Failed to Update Profile');
      });
  }
}
