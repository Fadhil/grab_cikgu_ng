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
  showSpinner: boolean = true;
  pmr: string;
  spm: string;
  dipdeg: string;
  masphd: string;
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
        this.firebaseService.tutorProfile = this.tutorProfile;
        this.pmr = this.tutorProfile.pmr;
        this.spm = this.tutorProfile.spm;
        this.dipdeg = this.tutorProfile.dipdeg;
        this.masphd = this.tutorProfile.masphd;

        if(!this.tutorProfile.picture) {
          if (this.tutorProfile.gender.toUpperCase() !== 'MALE') {
            this.avatar = 'assets/img/avatar2.png';
          }
          else {
            this.avatar = 'assets/img/avatar5.png';
          }
        } else {
          this.avatar = this.tutorProfile.picture;
        }

        this.showSpinner = false;
      });
  }

}
