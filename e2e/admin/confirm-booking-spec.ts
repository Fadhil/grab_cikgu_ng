var helper = require('./helper.ts');
var Promise = require('bluebird');

var urlChanged = function(testUrl) {
  return browser.getCurrentUrl().then(function(url) {
    return url === testUrl;
  });
};

var fs = require('fs');
function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}
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
    const EC = protractor.ExpectedConditions;

    console.log("as a student i would like to request a class");

    browser.get('http://localhost:4200/student/login');
    element(by.id('email')).sendKeys(browser.params.studentEmail1);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('login-submit')).click();
    var urlChanged = function(dom) {
      return browser.getCurrentUrl().then(function(url) {
        return url === 'http://localhost:4200/student/profile';
      });
    };
    browser.wait(urlChanged, 10000);
    browser.wait(function() {
      return element(by.id('username')).isPresent();
    }, 10000);
    browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, 'studentlogin.png');
          });
    element(by.id('findtutors')).click();
    var urlChanged = function(dom) {
      return browser.getCurrentUrl().then(function(url) {
        return url === 'http://localhost:4200/student/people';
      });
    };
    browser.wait(urlChanged, 10000);
    browser.wait(function() {
      return element(by.id('searchButton')).isPresent();
    }, 10000);
    element(by.id('subject')).element(by.cssContainingText('option', 'Bahasa Malaysia')).click();
    element(by.id('searchButton')).click();
    browser.wait(function() {
      return element(by.id('tutorList')).isPresent();
    }, 10000);
    expect(element(by.id('tutorsList')).getText()).toContain(browser.params.tutorName);
    //expect(element(by.id('tutorList')).element(by.cssContainingText('.item', browser.params.tutorName)));
    // let foo = element.all(by.id("tutorList")).all(by.css('.item'));
    // console.log(foo);

    browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, 'findingtutor.png');
          });

    // console.log("as an admin I would like to view the list of students request bookings");
    //
    // browser.get('http://localhost:4200/admin/login');
    // element(by.id('email')).sendKeys('wanakashah@p2digital.com');
    // element(by.id('password')).sendKeys('One_Nonly148');
    // element(by.id('login-submit')).click();
    // var urlChanged = function(dom) {
    //   return browser.getCurrentUrl().then(function(url) {
    //     return url === 'http://localhost:4200/admin/students';
    //   });
    // };
    // browser.wait(urlChanged, 10000);
    // browser.wait(function() {
    //   return element(by.id('loadnames')).isPresent();
    // }, 10000);
    //
    // //expect(element(by.id('loadnames')).getText()).toContain('');
    // element(by.id('tobookings')).click();
    // var urlChanged = function(dom) {
    //   return browser.getCurrentUrl().then(function(url) {
    //     return url === 'http://localhost:4200/admin/bookings';
    //   });
    // };
    // browser.wait(urlChanged, 10000);
    // browser.wait(function() {
    //   return element(by.id('loadbookings')).isPresent();
    // }, 10000);
    //
    // //expect(element(by.cssContainingText('loadbookings', browser.params.tutorName)).element(by.id('openPop')).click());
    //
    // browser.takeScreenshot().then(function (png) {
    //         writeScreenShot(png, 'classrequest.png');
    //       });
  }, 60000);
});
