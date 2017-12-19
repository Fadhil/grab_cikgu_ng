import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../../../services/firebase.service';

@Component({
  selector: 'app-tutor-sidebar',
  templateUrl: './tutor-sidebar.component.html',
  styleUrls: ['./tutor-sidebar.component.css']
})
export class TutorSidebarComponent implements OnInit {
  name: string;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.sfAuth.authState.subscribe(user => {
      if (user) {
        this.name = user.email;
      }
    });
  }

}
