import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css']
})
export class TutorProfileComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

}
