import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../../../services/firebase.service';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.css']
})
export class StudentSidebarComponent implements OnInit {
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
