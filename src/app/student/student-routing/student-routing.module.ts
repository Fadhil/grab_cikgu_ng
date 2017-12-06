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
      }
    ]
  },
  
  // {
  //   path: 'tutor', component: TutorLayoutComponent,
  //   children: [
  //     {
  //       path: 'profile',
  //       children: [
  //         {
  //           path: '', component:  TutorProfileComponent,
  //           pathMatch: 'full'
  //         },
  //         {
  //           path: 'edit', component: TutorProfileEditComponent,
  //           pathMatch: 'full'
  //         }
  //       ]
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule { }

export const studentRoutingComponents = [
  StudentLayoutComponent,  HeaderComponent, SidebarComponent, FooterComponent,
  ControlSidebarComponent, StudentLoginComponent, StudentRegisterComponent
];
