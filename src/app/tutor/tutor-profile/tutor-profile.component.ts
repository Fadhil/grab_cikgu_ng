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
  tutor_list_observable: any;
  avatar: string;

  constructor(
    private alertService: AlertService,
    private tutorService: TutorService,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    // Hides tooltip when switching between save/edit
    this.tutorProfile.id = localStorage.getItem('currentUserToken');
    $('.tooltip').hide();

    // Calculate tutor age based on birth year
    this.avatar = 'assets/img/avatar5.png';

    this.tutor_list_observable = this.firebaseService.getTutor(this.tutorProfile.id)
      .subscribe(data => {
        this.tutorProfile = data;
        const d = new Date();
        const n = d.getFullYear();
        this.tutorProfile.age = n - this.tutorProfile.byear;

        if (this.tutorProfile.gender.toUpperCase() !== 'MALE') {
          this.avatar = 'assets/img/avatar2.png';
        }

      });
  }

}
