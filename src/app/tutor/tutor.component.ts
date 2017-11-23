import { Component, OnInit } from '@angular/core';
import { Tutor } from './tutors';

declare var AdminLTE: any;

@Component({
  selector: 'app-tutor-content',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
  tutor: Tutor = {
    id: 1,
    name: "Sharifah",
    email: "sharifah@gmail.com",
    gender: "Female",
    occupation: "Teacher",
    age: 26
  }

  constructor() { }

  ngOnInit() {

  }

}
