import { Router } from '@angular/router';
import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from '../../shared/services/student.service';
import { FirebaseService } from '../../shared/services/firebase.service';



@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  student = new Student();
  fbAuth: any;
  submitted = false;

    submit(): void {
      this.fbAuth.createUserWithEmailAndPassword(this.student.email, this.student.password)
      .then( firebaseUser => {
        this.router.navigate(['/student/login']);
        console.log ('User created with uid ' + firebaseUser.uid);
        this.alertService.success('Successfully registered as a Student.');
        this.student.id = firebaseUser.uid;

        // remove fields to not be included into firebase
        delete this.student['cpass'];
        delete this.student['password'];

        // save to firebase
        this.firebaseService.addStudent(this.student);


      })
      .catch( error => {
        this.alertService.error(error);
        console.log(error);
      });
    }

    constructor(
      private alertService: AlertService,
      private studentService: StudentService,
      private router: Router,
      public firebaseService: FirebaseService
    ) {
      this.fbAuth = this.firebaseService.sfAuth.auth;
    }

    ngOnInit() {
    }
}
