import { TutorService } from './../../shared/services/tutor.service';
import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Tutor } from '../../models/tutor';


@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css']
})
export class TutorProfileComponent implements OnInit {
  tutorProfile = new Tutor();

  constructor(
    private alertService: AlertService,
    private tutorService: TutorService
  ) { }

  ngOnInit() {
    this.tutorService.getTutorProfile()
    .subscribe(result => {
      this.tutorProfile = result;
    });
  }

}