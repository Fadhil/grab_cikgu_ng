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

  mailTutorNotif(email) {

    let msg = `
      <p>Dear ${email},</p>
      <p>You have been requested as a Tutor at TutorGo. Please visit
      http://grabcikgu.firebaseapp.com/tutor/login to view your request.</p>
      <p>TutorGo</p>
    `
    let msgn = `Dear ${email}\n
                You have been requested as a Tutor at TutorGo. Please visit \n
                https://grabcikgu.firebaseapp.com/tutor/login to view your request.
                \n
                TutorGo
    `

    let mail_message = {
      'to': email,
      'from': 'tutorgo@ptpc.com',
      'subject': 'You have a request',
      'content': msgn,
      'htmlcontent': msg
    }

    return this.http.post(this.sendMailUrl, mail_message, this.httpOptions);

  }

  mailStudentNotif(email) {

    let msg = `
      <p>Dear ${email},</p>
      <p>You have requested a Tutor at TutorGo. Please visit
      http://grabcikgu.firebaseapp.com/student/login to view your request.</p>
      <p>TutorGo</p>
    `
    let msgn = `Dear ${email}\n
                You have requested a Tutor at TutorGo. Please visit \n
                https://grabcikgu.firebaseapp.com/student/login to view your request.
                \n
                TutorGo
    `

    let mail_message = {
      'to': email,
      'from': 'tutorgo@ptpc.com',
      'subject': 'You have made a request',
      'content': msgn,
      'htmlcontent': msg
    }

    return this.http.post(this.sendMailUrl, mail_message, this.httpOptions);

  }

  mailAcceptedNotif(email) {

    let msg = `
      <p>Dear ${email},</p>
      <p>Your request have been accepted at TutorGo. Please visit
      http://grabcikgu.firebaseapp.com/student/login to view your request.</p>
      <p>TutorGo</p>
    `
    let msgn = `Dear ${email}\n
                Your request have been accepted at TutorGo. Please visit \n
                https://grabcikgu.firebaseapp.com/student/login to view your request.
                \n
                TutorGo
    `

    let mail_message = {
      'to': email,
      'from': 'tutorgo@ptpc.com',
      'subject': 'Your request have been accepted',
      'content': msgn,
      'htmlcontent': msg
    }

    return this.http.post(this.sendMailUrl, mail_message, this.httpOptions);

  }

  mailDeclinedNotif(email) {

    let msg = `
      <p>Dear ${email},</p>
      <p>Your request have been declined at TutorGo. Please visit
      http://grabcikgu.firebaseapp.com/student/login to view your request.</p>
      <p>TutorGo</p>
    `
    let msgn = `Dear ${email}\n
                Your request have been declined at TutorGo. Please visit \n
                https://grabcikgu.firebaseapp.com/student/login to view your request.
                \n
                TutorGo
    `

    let mail_message = {
      'to': email,
      'from': 'tutorgo@ptpc.com',
      'subject': 'Your request have been declined',
      'content': msgn,
      'htmlcontent': msg
    }

    return this.http.post(this.sendMailUrl, mail_message, this.httpOptions);

  }

  mailCompleteNotif(email) {

    let msg = `
      <p>Dear ${email},</p>
      <p>A Tutor has completed a class at TutorGo. Please visit
      http://grabcikgu.firebaseapp.com/ to view.</p>
      <p>TutorGo</p>
    `
    let msgn = `Dear ${email}\n
                A Tutor has completed a class at TutorGo. Please visit \n
                https://grabcikgu.firebaseapp.com/ to view.
                \n
                TutorGo
    `
    let mail_message = {
      'to': email,
      'from': 'tutorgo@ptpc.com',
      'subject': 'Class Completed',
      'content': msgn,
      'htmlcontent': msg
    }

    return this.http.post(this.sendMailUrl, mail_message, this.httpOptions);

  }
}
