import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RequestModule } from './request/request.module';
import { RequestService } from './shared/services/request.service';
import { SearchResultsComponent } from './search-tutors/search-results/search-results.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { SearchTutorsComponent } from './search-tutors/search-tutors.component';
import { SearchTutorRoutes } from './search-tutors/search-tutor.routing';
import { RequestRoutes } from './request/request.routing';
import { StudentService } from './shared/services/student.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { TutorService } from './shared/services/tutor.service';
import { SearchService } from './shared/services/search.service';
import { LocationService } from './shared/services/location.service';

import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';
import { HeaderComponent } from './shared/components/layouts/header/header.component';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EqualValidator } from './shared/directive/equal-validator.directive';  // import validator
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StarterComponent } from './starter/starter.component';
import { StarterHeaderComponent } from './starter/starter-header/starter-header.component';
import { StarterLeftSideComponent } from './starter/starter-left-side/starter-left-side.component';
import { StarterContentComponent } from './starter/starter-content/starter-content.component';
import { StarterFooterComponent } from './starter/starter-footer/starter-footer.component';
import { StarterControlSidebarComponent } from './starter/starter-control-sidebar/starter-control-sidebar.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminLeftSideComponent } from './admin/admin-left-side/admin-left-side.component';
import { AdminContentComponent } from './admin/admin-content/admin-content.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AdminControlSidebarComponent } from './admin/admin-control-sidebar/admin-control-sidebar.component';
import { TutorRoutingModule, tutorRoutingComponents } from './tutor/tutor-routing/tutor-routing.module';
import { StudentRoutingModule, studentRoutingComponents } from './student/student-routing/student-routing.module';
import { TutorLayoutComponent } from './tutor/tutor-layout/tutor-layout.component';
import { StudentLayoutComponent } from './student/student-layout/student-layout.component';
import { SimpleLayoutComponent } from './shared/layouts/simple-layout/simple-layout.component';
import { MainHeaderComponent } from './shared/components/layouts/main-header/main-header.component';
import { DataTableModule } from 'angular2-datatable';
import { DataFilterPipe } from './shared/pipes/data-filter.pipe';
import { SplitSubjectsPipe } from './shared/pipes/split-subjects.pipe';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { FirebaseService } from './shared/services/firebase.service';

import { AppSettings } from './app.settings';
import { TutorSidebarComponent } from './shared/components/layouts/sidebar/tutor-sidebar/tutor-sidebar.component';
import { StudentSidebarComponent } from './shared/components/layouts/sidebar/student-sidebar/student-sidebar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import * as $ from "jquery";
import { HomepageComponent } from './homepage/homepage.component';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    StarterComponent,
    StarterHeaderComponent,
    StarterLeftSideComponent,
    StarterContentComponent,
    StarterFooterComponent,
    StarterControlSidebarComponent,
    SearchTutorsComponent,
    SearchResultsComponent,
    TutorLayoutComponent,
    StudentLayoutComponent,
    SimpleLayoutComponent,
    MainLayoutComponent,
    MainHeaderComponent,
    tutorRoutingComponents,
    studentRoutingComponents,
    DataFilterPipe,
    SplitSubjectsPipe,
    EqualValidator,
    TutorSidebarComponent,
    StudentSidebarComponent,
    HomepageComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TutorRoutingModule,
    StudentRoutingModule,
    RequestRoutes,
    SearchTutorRoutes,
    HttpClientModule,
    AdminModule,
    DataTableModule,
    RequestModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    NgbModule.forRoot(),
    InfiniteScrollModule,
    ScrollToModule.forRoot()
  ],
  providers: [
    AlertService, TutorService, StudentService, AuthenticationService, SearchService,
    RequestService, LocationService, FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
