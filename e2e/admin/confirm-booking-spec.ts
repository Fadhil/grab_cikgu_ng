var helper = require('./helper.ts');
var Promise = require('bluebird');

describe('TutorGo Admin confirm booking', function() {

  beforeAll( (done) => {
    // protractor.driver.manage().timeouts().setScriptTimeout(60000);
    console.log('Before All');
    const Faker = require('faker');
    browser.params.randomName = Faker.name.findName();
    browser.params.randomEmail = Faker.internet.email();
    browser.params.studentName1 = Faker.name.findName();
    browser.params.studentEmail1 = Faker.internet.email();
    browser.params.studentName2 = Faker.name.findName();
    browser.params.studentEmail2 = Faker.internet.email();
    browser.params.tutorName = Faker.name.findName();
    browser.params.tutorEmail = Faker.internet.email();

    browser.wait(helper.RegisterStudent(browser.params.studentName1, browser.params.studentEmail1), 5000)
      .then(() => {
        browser.wait(helper.RegisterStudent(browser.params.studentName2, browser.params.studentEmail2), 5000)
          .then(() => {
            browser.wait(helper.RegisterTutor(browser.params.tutorName, browser.params.tutorEmail), 5000)
              .then(() => {
                browser.wait(helper.TutorRegisterSubject(browser.params.tutorName, browser.params.tutorEmail), 30000)
                  .then(() => {
                    console.log('Actually done');
                    done();
                  });
              });
          });
      });
  }, 120000);

  it('as an admin i would like to view the list of students request bookings', function() {
    console.log("as an admin I would like to view the list of students request bookings");
    // browser.get('http://localhost:4200/admin/login');
    // element(by.id('email')).sendKeys(browser.params.randomEmail);
    // element(by.id('password')).sendKeys('12345678');
    // element(by.id('login-submit')).click();
    //
    // const EC = protractor.ExpectedConditions;
    //
    // var urlChanged = function(dom) {
    //   return browser.getCurrentUrl().then(function(url) {
    //     return url === 'http://localhost:4200/admin/bookings';
    //   });
      //pending();
      // done();
    }, 60000
  );

  it('should logout successfully', function() {
    //pending();
  }, 60000);

  it('should not allow unauthorized access', function() {
  //   browser.get('http://localhost:4200/admin/login');
  //   element(by.id('email')).sendKeys(browser.params.randomEmail);
  //   element(by.id('password')).sendKeys('nopass');
  //   element(by.id('login-submit')).click();
  //   browser.wait(function() {
  //     return element(by.css('.alert')).isPresent();
  //   }, 5000);
  //   expect(element(by.css('.alert')).getText()).toContain('Error: The password is invalid or the user does not have a password.');
    //pending();
  });
}, 60000);
