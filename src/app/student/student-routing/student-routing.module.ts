import { StudentLayoutComponent } from '../student-layout/student-layout.component';
import { StudentLoginComponent } from './../student-login/student-login.component';
import { ControlSidebarComponent } from './../../shared/components/layouts/control-sidebar/control-sidebar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/layouts/header/header.component';
import { SidebarComponent } from './../../shared/components/layouts/sidebar/sidebar.component';
// import { TutorListComponent } from '../tutor-list/tutor-list.component';
import { StudentComponent } from '../student.component';
import { FooterComponent } from '../../shared/components/layouts/footer/footer.component';
import { SimpleLayoutComponent } from '../../shared/layouts/simple-layout/simple-layout.component';
import { StudentRegisterComponent } from '../student-register/student-register.component';
import { StudentProfileComponent } from '../student-profile/student-profile.component';
import { StudentProfileEditComponent } from '../student-profile-edit/student-profile-edit.component';
import { StudentDashboardComponent } from '../student-dashboard/student-dashboard.component';
import { StudentAccountComponent } from '../student-account/student-account.component';
import { StudentClassComponent } from '../student-class/student-class.component';
import { StudentMessageComponent } from '../student-message/student-message.component';
import { StudentPeopleComponent } from '../student-people/student-people.component';
import { StudentReportComponent } from '../student-report/student-report.component';

const routes: Routes = [
  {
    path: 'students', component: StudentLayoutComponent,
    children: [
      {
        path: '', component: StudentLoginComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'student', component: SimpleLayoutComponent,
    children: [
      {
        path: 'login', component: StudentLoginComponent,
        pathMatch: 'full'
      },
      {
        path: 'register', component: StudentRegisterComponent,
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'student', component: StudentLayoutComponent,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '', component:  StudentProfileComponent,
            pathMatch: 'full'
          },
          {
            path: 'edit', component: StudentProfileEditComponent,
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'dashboard', component: StudentDashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'account', component: StudentAccountComponent,
        pathMatch: 'full'
      },
      {
        path: 'class', component: StudentClassComponent,
        pathMatch: 'full'
      },
      {
        path: 'message', component: StudentMessageComponent,
        pathMatch: 'full'
      },
      {
        path: 'people', component: StudentPeopleComponent,
        pathMatch: 'full'
      },
      {
        path: 'report', component: StudentReportComponent,
        pathMatch: 'full'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule { }

export const studentRoutingComponents = [
  StudentLayoutComponent,  HeaderComponent, SidebarComponent, FooterComponent,
  ControlSidebarComponent, StudentLoginComponent, StudentRegisterComponent, StudentProfileComponent,
  StudentProfileEditComponent, StudentDashboardComponent, StudentAccountComponent, StudentClassComponent,
  StudentMessageComponent, StudentPeopleComponent, StudentReportComponent
];
