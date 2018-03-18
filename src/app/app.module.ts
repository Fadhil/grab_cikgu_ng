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
// import { TutorPayDialogComponent } from './admin/admin-tutors/tutor-pay-dialog/tutor-pay-dialog.component';
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
import { AdminRoutingModule, adminRoutingComponents } from './admin/admin-routing/admin-routing.module';
import { TutorRoutingModule, tutorRoutingComponents } from './tutor/tutor-routing/tutor-routing.module';
import { StudentRoutingModule, studentRoutingComponents } from './student/student-routing/student-routing.module';
import { TutorLayoutComponent } from './tutor/tutor-layout/tutor-layout.component';
import { StudentLayoutComponent } from './student/student-layout/student-layout.component';
import { SimpleLayoutComponent } from './shared/layouts/simple-layout/simple-layout.component';
import { MainHeaderComponent } from './shared/components/layouts/main-header/main-header.component';
import { DataTableModule } from 'angular2-datatable';
import { DataFilterPipe } from './shared/pipes/data-filter.pipe';
import { SplitSubjectsPipe } from './shared/pipes/split-subjects.pipe';
import { RequestFilterPipe } from './shared/pipes/request-filter.pipe';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { environment } from '../environments/environment';
import { FirebaseService } from './shared/services/firebase.service';
import { ConfigService } from './shared/services/config.service';
import { MailService } from './shared/services/mail.service';

import { AppSettings } from './app.settings';
import { TutorSidebarComponent } from './shared/components/layouts/sidebar/tutor-sidebar/tutor-sidebar.component';
import { StudentSidebarComponent } from './shared/components/layouts/sidebar/student-sidebar/student-sidebar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';



// import { MatDialogModule } from '@angular/material/dialog';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatFormFieldModule,
} from '@angular/material';
import * as $ from "jquery";
import { HomepageComponent } from './homepage/homepage.component';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { DateformatPipe } from './shared/pipes/dateformat.pipe';


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
    adminRoutingComponents,
    DataFilterPipe,
    SplitSubjectsPipe,
    RequestFilterPipe,
    EqualValidator,
    TutorSidebarComponent,
    StudentSidebarComponent,
    HomepageComponent,
    LoadingSpinnerComponent,
    DateformatPipe,
    // TutorPayDialogComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TutorRoutingModule,
    StudentRoutingModule,
    AdminRoutingModule,
    RequestRoutes,
    SearchTutorRoutes,
    HttpClientModule,
    AdminModule,
    DataTableModule,
    RequestModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireStorageModule,
    NgbModule.forRoot(),
    InfiniteScrollModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatDialogModule,
    AdminModule
  ],
    exports: [
      MatNativeDateModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatInputModule,
      BrowserAnimationsModule,
      MatAutocompleteModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatStepperModule,
      MatFormFieldModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      MatDialogModule],
  providers: [
    AlertService, TutorService, StudentService, AuthenticationService, SearchService,
    RequestService, LocationService, FirebaseService, ConfigService, MailService
  ],
  bootstrap: [AppComponent],
  // entryComponents: [DialogOverviewExampleDialog]
})
export class AppModule { }
