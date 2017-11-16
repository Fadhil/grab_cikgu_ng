import { TutorRoutingModule } from './tutor-routing/tutor-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Shared Components
import { HeaderComponent } from '../shared/components/layouts/header/header.component';
import { SidebarComponent } from '../shared/components/layouts/sidebar/sidebar.component';

// Tutor Components
import { TutorComponent } from './tutor.component';
import { TutorLayoutComponent } from './tutor-layout/tutor-layout.component';


@NgModule({
  imports: [
    CommonModule,
    TutorRoutingModule
  ],
  declarations: [
    // Shared Components
    // HeaderComponent, SidebarComponent,
    // TutorComponent, TutorLayoutComponent
  ]
})
export class TutorModule { }
