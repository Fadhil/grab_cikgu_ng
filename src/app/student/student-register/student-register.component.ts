import { Router } from '@angular/router';
import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from '../../shared/services/student.service';



@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  student = new Student();
    submitted = false;

    submit(): void {
      this.studentService.createStudent(this.student)
        .subscribe(
          result => {
            this.router.navigate(['/student/login']);
            this.alertService.success('Successfully registered as a Student. ');
            this.student = result;
          },
          error => {
            this.alertService.error(error.error);
          }
        );
    }


    constructor(
      private alertService: AlertService,
      private studentService: StudentService,
      private router: Router
    ) { }

    ngOnInit() {
    }
}
