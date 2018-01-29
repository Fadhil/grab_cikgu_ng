import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentProfileEditComponent } from './student-profile-edit/student-profile-edit.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentPeopleComponent } from './student-people/student-people.component';
import { StudentClassComponent } from './student-class/student-class.component';
import { StudentMessageComponent } from './student-message/student-message.component';
import { StudentAccountComponent } from './student-account/student-account.component';
import { StudentReportComponent } from './student-report/student-report.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
  ],
  declarations: [StudentComponent,
    StudentRegisterComponent,
    StudentProfileComponent,
    StudentProfileEditComponent,
    StudentDashboardComponent,
    StudentPeopleComponent,
    StudentClassComponent,
    StudentMessageComponent,
    StudentAccountComponent,
    StudentReportComponent
]
})
export class StudentModule { }
