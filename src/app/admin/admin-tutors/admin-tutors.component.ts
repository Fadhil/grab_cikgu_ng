import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../../shared/services/firebase.service';
import { AlertService } from './../../shared/services/alert.service';
import { Router } from '@angular/router';
import { Tutor } from './../../models/tutor';
import { Subject, Subjects, Levels } from './../../models/subject';
import * as _ from 'lodash';


@Component({
  selector: 'app-admin-tutors',
  templateUrl: './admin-tutors.component.html',
  styleUrls: ['./admin-tutors.component.css']
})
export class AdminTutorsComponent implements OnInit {
  displayedColumns = ['name', 'email', 'actions'];
  myDataSource = new MatTableDataSource();
  tutor_observable: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.myDataSource.filter = filterValue;
  }

  constructor(
    private alertService: AlertService,
    private router: Router,
    public firebaseService: FirebaseService,
    // public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.tutor_observable = this.firebaseService.loadAdminTutors()
      .subscribe(data => {
        console.log(data);

        var returnArr = [];
        for (let item in data) {
          returnArr.push({key: item,
                          name: data[item].name,
                          email: data[item].email});
                        }
        this.myDataSource.data = _.reverse(returnArr);

  });


}

  deleteTutor(key){
  console.log(key);
  }

  ngAfterViewInit() {
    this.myDataSource.sort = this.sort;
    this.myDataSource.paginator = this.paginator;
  }
}
