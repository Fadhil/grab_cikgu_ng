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

    browser.get('/student/login');

    browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, './e2e/snapshots/studentlogin.png');
          });

    element(by.id('email')).sendKeys(browser.params.studentEmail1);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('login-submit')).click();
    var urlChanged = function(dom) {
      return browser.getCurrentUrl().then(function(url) {
        return url === browser.baseUrl + '/student/profile';
      });
    };
    browser.wait(urlChanged, 10000);
    browser.wait(function() {
      return element(by.id('username')).isPresent();
    }, 10000);
    browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, './e2e/snapshots/studentlogin.png');
          });
    element(by.id('findtutors')).click();
    var urlChanged = function(dom) {
      return browser.getCurrentUrl().then(function(url) {
        return url === browser.baseUrl + '/student/people';
      });
    };
    browser.wait(urlChanged, 10000);
    browser.wait(function() {
      return element(by.id('searchButton')).isPresent();
    }, 10000);
    element(by.id('subject')).element(by.cssContainingText('option', 'Bahasa Malaysia')).click();
    element(by.id('searchButton')).click();

    browser.wait(function() {
      return element(by.css('.item')).isPresent();
    }, 10000);

    // expect(element(by.id('tutorList')).getText()).toContain(browser.params.tutorName);

    let tc = element.all(by.css('.item')).count();
    expect(tc).toBe(5);

    var clickLoadMoreButtonUntilNotDisplayed = function() {
        // click on load more button until it is no longer visible
        return element(by.id('loadbatch')).getText().then(text => {
          if (text !== 'End of list') {
            // kira berapa item
            console.log("Load 5 more");
            browser.wait(function(){
              return element.all(by.css('.item')).count().then(c => {
                element(by.id('loadbatch')).click();
                browser.wait(function(){
                  return element.all(by.css('.item')).count().then(c2 => {
                    if ( c2 > c ) {
                      return true;
                    } else {
                      return false;
                    }
                  });
                }, 10000, "counting item timeout");
                return clickLoadMoreButtonUntilNotDisplayed();
              });
            }, 10000, 'loadbatch button not found');
            return true;
          } else {
            console.log("End of list");
            expect(element(by.id('tutorList')).getText()).toContain(browser.params.tutorName);

            element(by.cssContainingText('.product-title', browser.params.tutorName)).click();

            //wait for the element to display
            browser.wait(function() {
              return element(by.id('modal-default')).isDisplayed();
            }, 2000);

            // if we remove this it will make the element id date inaccessible.
            browser.takeScreenshot().then(function (png) {
                    writeScreenShot(png, './e2e/snapshots/findingtutor.png');
                  });

            element(by.id('date')).sendKeys('2018-03-31');
            element(by.id('time')).sendKeys('09:00pm');
            element(by.id('duration')).click();
            element(by.cssContainingText('mat-option', '2 hours')).click();
            element(by.id('requesttutor')).click();

            urlChanged = function(dom) {
              return browser.getCurrentUrl().then(function(url) {
                return url === browser.baseUrl + '/student/class';
              });
            };

            browser.wait(urlChanged, 30000);  //wait up to 60 seconds for URL to change

            expect(element(by.id('listofclasses')).getText()).toContain(browser.params.tutorName);

            // login as admin
            browser.get('/admin/login');

            element(by.id('email')).sendKeys('hazim@p2digital.com');
            element(by.id('password')).sendKeys('dig62xai');
            element(by.id('login-submit')).click();

            urlChanged = function(dom) {
              return browser.getCurrentUrl().then(function(url) {
                return url === browser.baseUrl + '/admin/students';
              });
            };
            browser.wait(urlChanged, 10000);

            // confirm the booking
            browser.get('/admin/bookings');
            urlChanged = function(dom) {
              return browser.getCurrentUrl().then(function(url) {
                return url === browser.baseUrl + '/admin/bookings';
              });
            };
            browser.wait(urlChanged, 10000);

            browser.wait(function(){
              return element(by.id('listofbookings')).getText().then(text => {
                return text.includes(browser.params.tutorName);
              });
            }, 10000);

            expect(element(by.id('listofbookings')).getText()).toContain(browser.params.tutorName);

            // Click on the tutor's info button

            element(by.id(browser.params.tutorName.replace(' ', '_'))).click();

            browser.takeScreenshot().then(function (png) {
                    writeScreenShot(png, './e2e/snapshots/admin-booking.png');
                  });

            browser.wait(EC.presenceOf(element(by.id('CRD'))), 5000, 'Not there');

            //confirm the class


            return true;
          }
        });
    };
    clickLoadMoreButtonUntilNotDisplayed();

  }, 60000);
});
