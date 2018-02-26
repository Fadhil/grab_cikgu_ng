import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MailService {
  sendMailUrl = 'https://us-central1-grabcikgu.cloudfunctions.net/api/sendMail';
  hdr: HttpHeaders = new HttpHeaders();
  httpOptions = {};

  constructor(private http:HttpClient) {
    this.hdr = this.hdr.set('Content-Type', 'application/json');
    this.httpOptions = {
      headers: this.hdr,
    };
   }

  sendMail(mail) {
    return this.http.post(this.sendMailUrl, mail, this.httpOptions);
  }

  mailAdminRegister(email) {

    let msg = `
      <p>Dear ${email},</p>
      <p>You have been registered as an admin at TutorGo. Please visit
      http://grabcikgu.firebaseapp.com/register to register and accept. </p>
      <p>TutorGo Admin</p>
    `
    let msgn = `Dear ${email}\n
                You have been registered as an admin at TutorGo. Please visit \n
                https://grabcikgu.firebaseapp.com/register to register and accept.
                \n
                TutorGo Admin
    `

    let mail_message = {
      'to': email,
      'from': 'tutorgo@ptpc.com',
      'subject': 'You have been registered as an admin',
      'content': msgn,
      'htmlcontent': msg
    }

    return this.http.post(this.sendMailUrl, mail_message, this.httpOptions);

  }
}
