import { TutorRoutingModule } from './tutor-routing/tutor-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Shared Components
import { HeaderComponent } from '../shared/components/layouts/header/header.component';
import { SidebarComponent } from '../shared/components/layouts/sidebar/sidebar.component';

// Tutor Components
import { TutorComponent } from './tutor.component';
import { TutorLayoutComponent } from './tutor-layout/tutor-layout.component';
// import { TutorListComponent } from './tutor-list/tutor-list.component';
// import { TutorLoginComponent } from './tutor-login/tutor-login.component';
// import { TutorRegisterComponent } from './tutor-register/tutor-register.component';
// import { TutorService } from '../shared/services/tutor.service';
// import { TutorProfileComponent } from './tutor-profile/tutor-profile.component';
// import { TutorProfileEditComponent } from './tutor-profile-edit/tutor-profile-edit.component';
// import { TutorDashboardComponent } from './tutor-dashboard/tutor-dashboard.component';
// import { TutorPeopleComponent } from './tutor-people/tutor-people.component';
// import { TutorClassComponent } from './tutor-class/tutor-class.component';
// import { TutorMessageComponent } from './tutor-message/tutor-message.component';
// import { TutorAccountComponent } from './tutor-account/tutor-account.component';
// import { TutorReportComponent } from './tutor-report/tutor-report.component';

@NgModule({
  imports: [
    CommonModule,
    TutorRoutingModule
  ],
  declarations: [
    // Shared Components
    // HeaderComponent, SidebarComponent,
    // TutorComponent, TutorLayoutComponent,
    // TutorListComponent,
    // TutorLoginComponent,
    // TutorRegisterComponent,
    // TutorProfileComponent,
    // TutorProfileEditComponent,
    // TutorDashboardComponent,
    // TutorPeopleComponent,
    // TutorClassComponent,
    // TutorMessageComponent,
    // TutorAccountComponent,
    // TutorReportComponent
]
})
export class TutorModule { }
