import { TutorService } from './../../shared/services/tutor.service';
import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Tutor } from '../../models/tutor';
import { FirebaseService } from '../../shared/services/firebase.service';


@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css']
})
export class TutorProfileComponent implements OnInit {
  tutorProfile = new Tutor();
  s: any;



  constructor(
    private alertService: AlertService,
    private tutorService: TutorService,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    // Hides tooltip when switching between save/edit
    this.tutorProfile.id = localStorage.getItem('currentUserToken');
    $('.tooltip').hide();

    this.s = this.firebaseService.getTutor(this.tutorProfile.id)
      .subscribe(data => {
        this.tutorProfile = data;
        console.log(this.tutorProfile);
      });
  }

}
