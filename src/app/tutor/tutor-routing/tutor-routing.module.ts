import { StudentLayoutComponent } from './../../student/student-layout/student-layout.component';
import { TutorProfileEditComponent } from './../tutor-profile-edit/tutor-profile-edit.component';
import { TutorProfileComponent } from './../tutor-profile/tutor-profile.component';
import { TutorLayoutComponent } from './../tutor-layout/tutor-layout.component';
import { TutorLoginComponent } from './../tutor-login/tutor-login.component';
import { ControlSidebarComponent } from './../../shared/components/layouts/control-sidebar/control-sidebar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/layouts/header/header.component';
import { SidebarComponent } from './../../shared/components/layouts/sidebar/sidebar.component';
import { TutorListComponent } from '../tutor-list/tutor-list.component';
import { TutorComponent } from '../tutor.component';
import { FooterComponent } from '../../shared/components/layouts/footer/footer.component';
import { SimpleLayoutComponent } from '../../shared/layouts/simple-layout/simple-layout.component';
import { TutorRegisterComponent } from '../tutor-register/tutor-register.component';
import { TutorDashboardComponent } from '../tutor-dashboard/tutor-dashboard.component';
import { TutorPeopleComponent } from '../tutor-people/tutor-people.component';
import { TutorClassComponent } from '../tutor-class/tutor-class.component';
import { TutorMessageComponent } from '../tutor-message/tutor-message.component';
import { TutorAccountComponent } from '../tutor-account/tutor-account.component';
import { TutorReportComponent } from '../tutor-report/tutor-report.component';


const routes: Routes = [
  {
    path: 'tutors', component: TutorLayoutComponent,
    children: [
      {
        path: '', component: TutorListComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'tutor', component: SimpleLayoutComponent,
    children: [
      {
        path: 'login', component: TutorLoginComponent,
        pathMatch: 'full'
      },
      {
        path: 'register', component: TutorRegisterComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'tutor', component: TutorLayoutComponent,
    children: [

      {
        path: 'profile',
        children: [
          {
            path: '', component:  TutorProfileComponent,
            pathMatch: 'full'
          },
          {
            path: 'edit', component: TutorProfileEditComponent,
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'dashboard', component: TutorDashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'people', component: TutorPeopleComponent,
        pathMatch: 'full'
      },
      {
        path: 'class', component: TutorClassComponent,
        pathMatch: 'full'
      },
      {
        path: 'account', component: TutorAccountComponent,
        pathMatch: 'full'
      },
      {
        path: 'message', component: TutorMessageComponent,
        pathMatch: 'full'
      },
      {
        path: 'report', component: TutorReportComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorRoutingModule { }

export const tutorRoutingComponents = [
  TutorComponent, TutorLayoutComponent, TutorListComponent, HeaderComponent, SidebarComponent, FooterComponent,
  ControlSidebarComponent, TutorLoginComponent, TutorRegisterComponent, TutorProfileComponent,
  TutorProfileEditComponent, TutorDashboardComponent, TutorPeopleComponent, TutorClassComponent, TutorAccountComponent,
  TutorReportComponent, TutorMessageComponent
];
