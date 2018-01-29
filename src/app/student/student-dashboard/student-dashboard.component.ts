import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  someData: number;
  otherData: 2;
  date = '' ;
  time = '';
  constructor() {
    this.someData = 0;
   }

  ngOnInit() {
  }

  showdata(data) {
    this.someData = data;
  }

}
