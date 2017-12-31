
// at the top of the test spec:
    var fs = require('fs');

    // abstract writing screen shot to a file
    function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }

describe('grabcikgu tutor registration page', function() {

  beforeAll(() => {
    const Faker = require('faker');
    browser.params.randomName = Faker.name.findName();
    browser.params.randomEmail = Faker.internet.email();
  });

  beforeEach(function() {

  });

  it('should allow a tutor to register successfully', function() {
    browser.get('http://localhost:4200/tutor/register');
    expect(element(by.id('register-form-link')).getText()).toContain('Register');
    element(by.id('name')).sendKeys(browser.params.randomName);
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('confirm-password')).sendKeys('12345678');
    element(by.id('ic_no')).sendKeys('780111-10-2332');
    element(by.id('gender')).element(by.cssContainingText('option', 'Male')).click();
    element(by.id('day')).element(by.cssContainingText('option', '27')).click();
    element(by.id('month')).element(by.cssContainingText('option', '1')).click();
    element(by.id('year')).sendKeys('1978');
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
  });

  it('should not allow duplicate registration', function() {
    browser.get('http://localhost:4200/tutor/register');
    element(by.id('name')).sendKeys(browser.params.randomName);
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('confirm-password')).sendKeys('12345678');
    element(by.id('register-submit')).click();
    browser.wait(function() {
      return element(by.css('.alert')).isPresent();
    }, 5000);
    expect(element(by.css('.alert')).getText()).toContain('The email address is already in use by another account.');
  });

  it('should allow a tutor to login successfully and display correct data profile', function() {
    browser.get('http://localhost:4200/tutor/login');
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('login-submit')).click();

    const EC = protractor.ExpectedConditions;

    var urlChanged = function(dom) {
      return browser.getCurrentUrl().then(function(url) {
        return url === 'http://localhost:4200/tutor/profile';
      });
    };

    const condition = EC.and(urlChanged,
                    EC.textToBePresentInElement($('.profile-username'), browser.params.randomName));


    browser.wait(urlChanged, 10000);

    // browser.takeScreenshot().then(function (png) {
    //         writeScreenShot(png, 'exception.png');
    //     });

    browser.wait(EC.textToBePresentInElement($('.profile-username'), browser.params.randomName), 5000);
    expect(element(by.id('ic_no')).getText()).toContain('780111-10-2332');
    expect(element(by.id('occupation')).getText()).toContain('Programmer');
    expect(element(by.id('gender')).getText()).toContain('Male');

    const d = new Date();
    const n = d.getFullYear();
    const age = n - 1978;
    expect(element(by.id('age')).getText()).toContain(age);

    expect(element(by.id('city')).getText()).toContain('Cyberjaya');
    expect(element(by.id('state')).getText()).toContain('Selangor');
  });

  it('should not allow unauthorized access', function() {
    browser.get('http://localhost:4200/tutor/login');
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('nopass');
    element(by.id('login-submit')).click();
    browser.wait(function() {
      return element(by.css('.alert')).isPresent();
    }, 5000);
    expect(element(by.css('.alert')).getText()).toContain('Error: The password is invalid or the user does not have a password.');
  });

  it('should be allowed to edit successfully', function() {
    browser.get('http://localhost:4200/tutor/login');
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('login-submit')).click();

    const EC = protractor.ExpectedConditions;

    let urlChanged = function(dom) {
      return browser.getCurrentUrl().then(function(url) {
        return url === 'http://localhost:4200/tutor/profile';
      });
    };

    let condition = EC.and(urlChanged,
                    EC.textToBePresentInElement($('.profile-username'), browser.params.randomName));

    browser.wait(urlChanged, 10000);
    browser.wait(EC.textToBePresentInElement($('.profile-username'), browser.params.randomName), 5000);
    // click on the button
    element(by.id('saveprofile')).click();

    urlChanged = function(dom) {
      return browser.getCurrentUrl().then(function(url) {
        return url === 'http://localhost:4200/tutor/profile/edit';
      });
    };

    // expect page to display the right data

    const name_box = element(by.id('name'));

    checkInputValue = function () {
      return name_box.getAttribute('value').then(function (value) {
        return value === browser.params.randomName;
      });
    };

    condition = EC.and(urlChanged, checkInputValue);

    browser.wait(urlChanged, 5000);

    // change some data
    element(by.id('address')).sendKeys('Lot 8919, Jalan Kerbau');

    // Register for the subjects
    element(by.id('bm')).element(by.css('.s1_3')).click();
    element(by.id('bm')).element(by.css('.s4_6')).click();

    // press save and expect to return successful alert
    element(by.id('saveprofile')).click();

    urlChanged2 = function() {
      return browser.getCurrentUrl().then(function(url) {
        return url === 'http://localhost:4200/tutor/profile';
      });
    };

    browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, 'exception.png');
        });


    browser.wait(urlChanged2, 5000);

    expect(element(by.css('.alert')).getText()).toContain('Successfully');

    // Check for all the list of the subjects
    element(by.id('tuitionservicepanel')).click();

    // browser.takeScreenshot().then(function (png) {
    //         writeScreenShot(png, 'exception.png');
    //     });

    expect(element(by.id('subjects')).getText()).toContain('Bahasa Malaysia (Standard 1-3)');
    expect(element(by.id('subjects')).getText()).toContain('Bahasa Malaysia (Standard 4-6)');

  });

  it('can logout successfully', function() {
    console.log('Pending');

    // Click on the username menu
    element(by.id('profile-menu-dropdown')).click();
    element(by.id('signOutButton')).click();

    // Click on the logout menu

    // Expect page to change url to login and display the successful signout message
    const urlChanged2 = function() {
      return browser.getCurrentUrl().then(function(url) {
        return url === 'http://localhost:4200/tutor/login';
      });
    };

    browser.wait(urlChanged2, 5000);

    // expect(element(by.css('.alert')).getText()).toContain('Successfully Logged Out from GrabCikgu.');

  });

});
