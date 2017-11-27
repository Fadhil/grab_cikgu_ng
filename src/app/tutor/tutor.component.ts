import { Component, OnInit } from '@angular/core';
import { Tutor } from '../models/tutor';

declare var AdminLTE: any;

@Component({
  selector: 'app-tutor-content',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
  tutor = new Tutor();

  constructor() { }

  ngOnInit() {

  }

}
