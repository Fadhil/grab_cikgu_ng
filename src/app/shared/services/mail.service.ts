import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MailService {
  sendMailUrl = 'https://us-central1-grabcikgu.cloudfunctions.net/api/sendMail';
  hdr: HttpHeaders = new HttpHeaders();
  httpOptions = {};

  constructor(private http: HttpClient) {
    this.hdr = this.hdr.set('Content-Type', 'application/json');
    this.httpOptions = {
      headers: this.hdr,
    };
   }

  sendMail(mail) {
    return this.http.post(this.sendMailUrl, mail, this.httpOptions);
  }

  mailAdminRegister(da) {
    let urlc;

    if (isDevMode()){
      urlc = "http://localhost:4200/admin/invite?code";
    } else {
      urlc = "https://grabcikgu.firebaseapp.com/admin/invite?code";
    }

    let msg = `
      <p>Dear ${da.email},</p>
      <p>You have been registered as an admin at TutorGo. Please visit
      ${urlc}=${da.code} to register and accept. </p>
      <p>TutorGo Admin</p>
    `
    let msgn = `Dear ${da.email}\n
                You have been registered as an admin at TutorGo. Please visit \n
                ${urlc}=${da.code} to register and accept.
                \n
                TutorGo Admin
    `

    let mail_message = {
      'to': da.email,
      'from': 'tutorgo@ptpc.com',
      'subject': 'You have been registered as an admin',
      'content': msgn,
      'htmlcontent': msg
    }

    return this.http.post(this.sendMailUrl, mail_message, this.httpOptions);

  }
}
