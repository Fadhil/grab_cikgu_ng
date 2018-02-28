import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminDashboard2Component } from './../admin-dashboard2/admin-dashboard2.component';
import { AdminComponent } from './../admin.component';
import { AdminStudentsComponent, StudentDialog } from './../admin-students/admin-students.component';
import { AdminTutorsComponent, TutorDialog } from './../admin-tutors/admin-tutors.component';
import { AdminBookingsComponent, BookingDialog } from './../admin-bookings/admin-bookings.component';
import { AdminControlSidebarComponent } from './../admin-control-sidebar/admin-control-sidebar.component';
import { AdminFooterComponent } from './../admin-footer/admin-footer.component';
import { AdminContentComponent } from './../admin-content/admin-content.component';
import { AdminLeftSideComponent } from './../admin-left-side/admin-left-side.component';
import { AdminHeaderComponent } from './../admin-header/admin-header.component';
import { AdminLoginComponent } from './../admin-login/admin-login.component';
import { SimpleLayoutComponent } from '../../shared/layouts/simple-layout/simple-layout.component';
import { AdminRegisterComponent, DialogOverviewExampleDialog } from './../admin-register/admin-register.component';
import { InviteComponent } from './../invite/invite.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard2',
            pathMatch: 'full'
          },
          {
            path: 'dashboard2',
            component: AdminDashboard2Component
          },
          {
            path: 'students',
            component: AdminStudentsComponent
          },
          {
            path: 'tutors',
            component: AdminTutorsComponent
          },
          {
            path: 'bookings',
            component: AdminBookingsComponent
          },
          {
            path: 'register',
            component: AdminRegisterComponent
          }
        ]
      },
      {
        path: 'admin', component: SimpleLayoutComponent,
        children: [{
          path: 'login',
          component: AdminLoginComponent
        },
        {
          path: 'invite',
          component: InviteComponent
        }]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }

export const adminRoutingComponents = [
  AdminComponent, AdminDashboard2Component, AdminStudentsComponent,
  AdminTutorsComponent, AdminBookingsComponent, AdminHeaderComponent,
  AdminControlSidebarComponent, AdminFooterComponent, AdminContentComponent,
  AdminLeftSideComponent, AdminHeaderComponent, AdminLoginComponent, AdminRegisterComponent,
  DialogOverviewExampleDialog, StudentDialog, TutorDialog, BookingDialog, InviteComponent
];
