import { Component, OnInit } from '@angular/core';
declare var AdminLTE: any;

@Component({
  selector: 'app-tutor-layout',
  templateUrl: './tutor-layout.component.html',
  styleUrls: ['./tutor-layout.component.css']
})
export class TutorLayoutComponent implements OnInit {
  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  constructor() { }

  ngOnInit() {
    // add the the body classes
    // AdminLTE.init();
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
  }

}
