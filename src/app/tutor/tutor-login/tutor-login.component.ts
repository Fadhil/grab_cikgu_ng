import { AlertService } from './../../shared/services/alert.service';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-login',
  templateUrl: './tutor-login.component.html',
  styleUrls: ['./tutor-login.component.css']
})
export class TutorLoginComponent implements OnInit {
  email = '';
  password = '';
  token = '';
  constructor(
    private authenticationService: AuthenticationService, 
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    this.authenticationService.login(this.email, this.password)
      .subscribe(
        result => {
          console.log("authenticating", result);
          localStorage.setItem('currentUserToken', result.data.token);
          this.alertService.success('Successfully logged in.', true);
          this.router.navigate(['/tutor/profile']);

        },
        error => {
          this.alertService.error(error.error);
        }
      );
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
