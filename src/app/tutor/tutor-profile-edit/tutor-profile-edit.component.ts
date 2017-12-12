import { Router } from '@angular/router';
import { Tutor } from './../../models/tutor';
import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { TutorService } from '../../shared/services/tutor.service';
import { LocationService } from '../../shared/services/location.service';
import { State } from '../../models/state';
import { City } from '../../models/city';
declare var $:JQueryStatic;

@Component({
  selector: 'app-tutor-profile-edit',
  templateUrl: './tutor-profile-edit.component.html',
  styleUrls: ['./tutor-profile-edit.component.css']
})
export class TutorProfileEditComponent implements OnInit {
  states: State[] = [];
  cities: City[] = [];
  tutorProfile = new Tutor();
  hourlyRate = 0;
  constructor(private tutorService: TutorService,
  private alertService: AlertService,
  private locationService: LocationService,
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

    this.locationService.getStates()
    .subscribe(results => {
      this.states = results;
    })
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

  onStateChange(state) {
    this.locationService.getCities(state)
      .subscribe(result => {
        this.cities = result;
      }, error => {
         this.alertService.error('Failed to find cities for ' + state);
      });
  }
}
