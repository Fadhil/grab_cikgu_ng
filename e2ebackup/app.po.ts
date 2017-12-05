import { browser, by, element } from 'protractor';

export class AngularAdminLTEPage {
  navigateTo() {
    return browser.get('/tutor/login');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
