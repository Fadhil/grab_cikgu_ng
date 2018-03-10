var fs = require('fs');
function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

var urlChanged = function(testUrl) {
  return browser.getCurrentUrl().then(function(url) {
    return url === testUrl;
  });
};

//module.exports.urlChanged = urlChanged;

var RegisterStudent = function(name, email) {
  var deferred = protractor.promise.defer();
  browser.get('http://localhost:4200/student/register');
  browser.wait(function() {
    return element(by.id('register-form-link')).isPresent();
  }, 5000);

  // expect(element(by.id('register-form-link')).getText()).toContain('Register');
  element(by.id('name')).sendKeys(name);
  element(by.id('email')).sendKeys(email);
  element(by.id('password')).sendKeys('12345678');
  element(by.id('confirm-password')).sendKeys('12345678');

  element(by.id('register-submit')).click();
  browser.wait(function() {
    return element(by.css('.alert')).isPresent();
  }, 5000);
  expect(element(by.css('.alert')).getText()).toContain("Successfully registered as a Student.");
  // expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/student/login');
  console.log("Created Student");
  deferred.fulfill(true);
  return deferred.promise;
};

//module.exports.RegisterStudent = RegisterStudent;

var RegisterTutor = function(name, email) {
  var deferred = protractor.promise.defer();
  browser.get('http://localhost:4200/tutor/register');
  expect(element(by.id('register-form-link')).getText()).toContain('Register');
  element(by.id('name')).sendKeys(name);
  element(by.id('email')).sendKeys(email);
  element(by.id('password')).sendKeys('12345678');
  element(by.id('confirm-password')).sendKeys('12345678');
  element(by.id('ic_no')).sendKeys('780111-10-2332');
  element(by.id('gender')).element(by.cssContainingText('option', 'Male')).click();
  element(by.id('day')).element(by.cssContainingText('option', '27')).click();
  element(by.id('month')).element(by.cssContainingText('option', '1')).click();
  element(by.id('year')).sendKeys('1978');

  // elemet(by.id)

  element(by.id('occupation')).sendKeys('Programmer');
  element(by.id('status')).element(by.cssContainingText('option', 'Full-Time')).click();
  element(by.id('state')).element(by.cssContainingText('option', 'Selangor')).click();
  element(by.id('city')).element(by.cssContainingText('option', 'Cyberjaya')).click();

  element(by.id('register-submit')).click();
  browser.wait(function() {
    return element(by.css('.alert')).isPresent();
  }, 5000);
  expect(element(by.css('.alert')).getText()).toContain("Successfully registered as a Tutor.");
  expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/tutor/login');
  console.log("Created Tutor");

  deferred.fulfill(true);
  return deferred.promise;
};

//module.exports.RegisterTutor = RegisterTutor;

var TutorRegisterSubject = function(name, email){
  console.log("TutorRegisterSubject");
  var deferred = protractor.promise.defer();
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  console.log("Original Timeout");
  console.log(originalTimeout);
  browser.get('http://localhost:4200/tutor/login');
  element(by.id('email')).sendKeys(email);
  element(by.id('password')).sendKeys('12345678');
  element(by.id('login-submit')).click();

  const EC = protractor.ExpectedConditions;

  let urlChanged = function(dom) {
    return browser.getCurrentUrl().then(function(url) {
      return url === 'http://localhost:4200/tutor/profile';
    });
  };

  browser.wait(urlChanged, 5000);  //wait up to 60 seconds for URL to change

  browser.wait(function() {
    //wait for another 30 seconds
    return element(by.id('profilepagetitle')).isPresent();
  }, 10000);
  //
  // browser.takeScreenshot().then(function (png) {
  //         writeScreenShot(png, 'exception.png');
  //     });
  // // expect(element(by.id('profilepagetitle')).getText()).toContain('Profile');
  // // click on the button
  //
  element(by.id('editprofilebutton')).click();
  //
  urlChanged = function(dom) {
    return browser.getCurrentUrl().then(function(url) {
      return url === 'http://localhost:4200/tutor/profile/edit';
    });
  };

  browser.wait(urlChanged, 5000);

  browser.wait(function() {
    //wait for another 30 seconds
    return element(by.id('profileinformation')).isPresent();
  }, 10000);


  // change some data
  element(by.id('address')).sendKeys('Lot 8919, Jalan Lembu');

  // Register for the subjects
  element(by.id('bm')).element(by.css('.s1_3')).click();
  element(by.id('bm')).element(by.css('.s4_6')).click();

  // press save and expect to return successful alert
  element(by.id('saveprofile')).click();

  let urlChanged2 = function() {
    return browser.getCurrentUrl().then(function(url) {
      return url === 'http://localhost:4200/tutor/profile';
    });
  };

  browser.wait(urlChanged2, 5000);

  // expect(element(by.css('.alert')).getText()).toContain('Successfully');

  browser.wait(function() {
    //wait for another 30 seconds
    return element(by.id('tuitionservicepanel')).isPresent();
  }, 10000);

  // Check for all the list of the subjects
  element(by.id('tuitionservicepanel')).click();

  browser.wait(function() {
    //wait for another 30 seconds
    return element(by.id('subjects')).isPresent();
  }, 10000);

  browser.takeScreenshot().then(function (png) {
          writeScreenShot(png, 'tuitionservicepanel.png');
      });

  expect(element(by.id('subjects')).getText()).toContain('Bahasa Malaysia (Standard 1-3)');
  expect(element(by.id('subjects')).getText()).toContain('Bahasa Malaysia (Standard 4-6)');
  console.log("Subject Registered");
  deferred.fulfill(true);
  return deferred.promise;
};

//module.exports.TutorRegisterSubject = TutorRegisterSubject;

module.exports = {
  urlChanged,
  RegisterStudent,
  RegisterTutor,
  TutorRegisterSubject
};
