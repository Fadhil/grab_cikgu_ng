import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MailService {
  sendMailUrl = 'https://us-central1-grabcikgu.cloudfunctions.net/helloWorld';

  constructor(private http:HttpClient) { }

  sendMail() {

    let hdr: HttpHeaders = new HttpHeaders();
    hdr.set('Content-Type', 'application/json');

    console.log(hdr);

    let httpOptions = {
      headers: hdr
    };

    let a = this.http.get(this.sendMailUrl);
    console.log(a);
    return a;
  }
}
