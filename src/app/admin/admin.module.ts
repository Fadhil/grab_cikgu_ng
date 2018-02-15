import { AdminRoutingModule } from './admin-routing/admin-routing.module';
// import { AdminControlSidebarComponent } from './admin-control-sidebar/admin-control-sidebar.component';
// import { AdminFooterComponent } from './admin-footer/admin-footer.component';
// import { AdminContentComponent } from './admin-content/admin-content.component';
// import { AdminLeftSideComponent } from './admin-left-side/admin-left-side.component';
// import { AdminHeaderComponent } from './admin-header/admin-header.component';
// import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AdminDashboard2Component } from './admin-dashboard2/admin-dashboard2.component';
// import { AdminTutorsComponent } from './admin-tutors/admin-tutors.component';
// import { AdminStudentsComponent } from './admin-students/admin-students.component';
// import { AdminBookingsComponent } from './admin-bookings/admin-bookings.component';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { DialogOverviewExampleDialog } from './admin-register/admin-register.component';
import { StudentDialog } from './admin-students/admin-students.component';
import { TutorDialog } from './admin-tutors/admin-tutors.component';
import { BookingDialog } from './admin-bookings/admin-bookings.component';
// import { AdminLoginComponent } from './admin-login/admin-login.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [],
  entryComponents: [DialogOverviewExampleDialog,
                    StudentDialog,
                    TutorDialog,
                    BookingDialog
                    ]

    // AdminComponent,
    // AdminHeaderComponent,
    // AdminLeftSideComponent,
    // AdminContentComponent,
    // AdminFooterComponent,
    // AdminControlSidebarComponent,
    // AdminDashboard2Component,
    // AdminTutorsComponent,
    // AdminStudentsComponent,
    // AdminBookingsComponent,
    // AlertComponent
  // AdminLoginComponent]
})
export class AdminModule { }
