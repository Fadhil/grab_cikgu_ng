import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../../services/firebase.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
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
