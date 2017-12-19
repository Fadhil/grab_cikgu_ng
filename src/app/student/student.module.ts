import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentProfileEditComponent } from './student-profile-edit/student-profile-edit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StudentComponent,
    StudentRegisterComponent,
    StudentProfileComponent,
    StudentProfileEditComponent
]
})
export class StudentModule { }