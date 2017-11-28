import { TutorRoutingModule } from './tutor-routing/tutor-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Shared Components
import { HeaderComponent } from '../shared/components/layouts/header/header.component';
import { SidebarComponent } from '../shared/components/layouts/sidebar/sidebar.component';

// Tutor Components
import { TutorComponent } from './tutor.component';
import { TutorLayoutComponent } from './tutor-layout/tutor-layout.component';
import { TutorListComponent } from './tutor-list/tutor-list.component';
import { TutorLoginComponent } from './tutor-login/tutor-login.component';
import { TutorRegisterComponent } from './tutor-register/tutor-register.component';
import { TutorService } from '../shared/services/tutor.service';
import { TutorProfileComponent } from './tutor-profile/tutor-profile.component';


@NgModule({
  imports: [
    CommonModule,
    TutorRoutingModule
  ],
  declarations: [
    // Shared Components
    // HeaderComponent, SidebarComponent,
    // TutorComponent, TutorLayoutComponent,
    TutorListComponent,
    TutorLoginComponent,
    TutorRegisterComponent,
    TutorProfileComponent
]
})
export class TutorModule { }
