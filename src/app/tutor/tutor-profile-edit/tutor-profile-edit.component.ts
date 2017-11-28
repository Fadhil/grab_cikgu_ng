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
  private alertService: AlertService) {
  }

  ngOnInit() {
    console.log('initializing Tutor Service');
    this.tutorService.getTutorProfile()
    .subscribe(result => {
      // this.tutorProfile = result;
      console.log("got profile", this.tutorProfile);
    });
    console.log('initialized tutor Profile');
  }

  display_change(newValue) {
    console.log(newValue);
  }
}
