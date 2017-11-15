import { TutorRoutingModule } from './tutor-routing/tutor-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorComponent } from './tutor.component';
import { HeaderComponent } from '../shared/components/layouts/header/header.component';
import { TutorLayoutComponent } from './tutor-layout/tutor-layout.component';


@NgModule({
  imports: [
    CommonModule,
    TutorRoutingModule
  ],
  declarations: [
    TutorComponent, HeaderComponent,
    TutorLayoutComponent
  ]
})
export class TutorModule { }
