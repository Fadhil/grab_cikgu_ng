import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentRegisterComponent } from './student-register/student-register.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StudentComponent,
    StudentRegisterComponent
]
})
export class StudentModule { }