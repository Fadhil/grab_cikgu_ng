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
        path: 'profile', component: TutorProfileComponent,
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
  ControlSidebarComponent, TutorLoginComponent, TutorRegisterComponent, TutorProfileComponent
];
