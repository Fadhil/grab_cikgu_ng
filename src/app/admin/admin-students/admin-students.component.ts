import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Router } from '@angular/router';
import { Student } from './../../models/student';
import { Tutor } from '../../models/tutor';
import { Subject, Subjects, Levels } from './../../models/subject';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {
  displayedColumns = ['date', 'time', 'duration', 'name', 'tutor', 'status', 'action'];
  myDataSource = new MatTableDataSource();
  students_observable: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.students_observable = this.firebaseService.loadAdminStudents()
      .subscribe(data => {
        console.log(data);
      })
  }

}
