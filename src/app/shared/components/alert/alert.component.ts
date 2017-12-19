import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/index';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      $('.alert').show();
      $('.alert').removeClass('fade out');
      this.message = message;
      this.fadeOutAndRemove();
    });
  }

  fadeOutAndRemove() {
    setTimeout(() => { $('.alert').addClass('fade out'); }, 4000); setTimeout(() => { $('.alert').hide(); }, 4200);
  }
}
