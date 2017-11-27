import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-register',
  templateUrl: './tutor-register.component.html',
  styleUrls: ['./tutor-register.component.css']
})
export class TutorRegisterComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    // $(function() {
      
    //       $('#login-form-link').click(function(e) {
    //         $("#login-form").delay(100).fadeIn(100);
    //        $("#register-form").fadeOut(100);
    //       $('#register-form-link').removeClass('active');
    //       $(this).addClass('active');
    //       e.preventDefault();
    //     });
    //     $('#register-form-link').click(function(e) {
    //       $("#register-form").delay(100).fadeIn(100);
    //        $("#login-form").fadeOut(100);
    //       $('#login-form-link').removeClass('active');
    //       $(this).addClass('active');
    //       e.preventDefault();
    //     });
      
    //   });
      
  }

}
