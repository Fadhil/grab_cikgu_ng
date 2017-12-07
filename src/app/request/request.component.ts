import { TutorService } from './../shared/services/tutor.service';
import { Tutor } from './../models/tutor';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/services/request.service';
import { AlertService } from '../shared/services/index';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  tutor = new Tutor();
  constructor(
    private requestService: RequestService,
    private alertService: AlertService,
    private router: Router, private route: ActivatedRoute,
    private tutorService: TutorService
  ) { }

  ngOnInit() {
    const tutor_id = this.route.snapshot.paramMap.get('tutor_id');
    console.log('the url id: ', tutor_id);
    this.tutorService.getTutor(tutor_id)
      .subscribe(
        results => {
          this.tutor = results.data;
          console.log('got tutor', this.tutor);
        },
        error => {
        console.log('Failed to get tutors:', error);
        this.alertService.error('Failed to find any Tutors');
      });
  }

  createRequest(tutor) {
    this.requestService.createRequest(tutor)
    .subscribe(
      result => {
        console.log('made request', result);
        this.alertService.success('Request created successfully. Please wait for the system to validate your request.', true);
        this.router.navigate(['/search']);

      },
      error => {
        this.alertService.error(error.error);
      }
    );
  }

}
